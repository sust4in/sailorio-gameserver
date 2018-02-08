const config = require('../config/game');
const THREE = require('three');

const socketioJwt = require("socketio-jwt");
const { JWT_SECRET } = require('../config/vars');

const YAML = require('yamljs');

const SupplyController = require("./controllers/supply.controller");
const PlayerController = require("./controllers/player.controller");
const ShipController = require("./controllers/ship.controller");
const EntityController = require("./controllers/entity.controller");

const flatbuffers = require('flatbuffers').flatbuffers;
const Packet = require("./fbs/message_generated").SailorIO;
const ClientInputPacket = require("./fbs/clientinput_generated").SailorIO;

exports = module.exports = ServerCore;

function ServerCore(socket, uws) {
    this.options = config;
    this.uws = uws;
    this.uws.binaryType = 'arraybuffer';
    this.uws.options = { binary: true };
    this.io = socket;
    this.lastUpdateTime = 0;
    this.updatePassTime = null;
    this.worldConfig = YAML.load(__base + "config/gamesettings/world.yaml");
    this.supplyConfig = YAML.load(__base + "config/gamesettings/supplies.yaml");
    this.shipConfig = YAML.load(__base + "config/gamesettings/ships.yaml");
    this.supplyController = new SupplyController();
    this.playerController = new PlayerController();
    this.shipController = new ShipController();
    this.entityController = new EntityController();
    this.worldConfig.worldLeftX = this.worldConfig.offSetX - (this.worldConfig.width / 2);
    this.worldConfig.worldUpZ = (this.worldConfig.length / 2) - this.worldConfig.offSetZ;
    this.worldConfig.worldRightX = (this.worldConfig.width / 2) - this.worldConfig.offSetX;
    this.worldConfig.worldDownZ = this.worldConfig.offSetZ - (this.worldConfig.length / 2);
}

ServerCore.prototype.broadcastState = function () {
    let builder = new flatbuffers.Builder(0);

    let serverTime = new Date().getTime() - this.startTime;
    this.updatePassTime = serverTime - this.lastUpdateTime;
    this.lastUpdateTime = serverTime;
    //let updateTime =  builder.createString((new Date().getTime() / 1000.00000);
    let updateTime =  new Date().getTime() / 1000.00000;
    Packet.Models.UpdateModel.createSupplyCratesVector(builder, this.supplyController.GetSupplies(Packet, builder));
    Packet.Models.UpdateModel.createShipModelsVector(builder, this.shipController.GetAllShips(Packet, builder));
    Packet.Models.UpdateModel.startUpdateModel(builder);
    Packet.Models.UpdateModel.addUpdatePassTime(builder, this.updatePassTime);
    Packet.Models.UpdateModel.addEventType(builder, Packet.Models.EventTypes.UpdateModel);
    Packet.Models.UpdateModel.addUpdateTime(builder, updateTime);
    let updateModel = Packet.Models.UpdateModel.endUpdateModel(builder);
    builder.finish(updateModel);
    this.supplyController.supplyItems = this.supplyController.supplyItems.filter(function(el) { return el.isDeath === false });
    let buffer = builder.asUint8Array();
    console.log("DATA LEN: "+ buffer.length);
    console.log("TOTAL USER: "+ this.uws.clients.length);
    this.uws.broadcast(buffer, this.uws.options);
};

ServerCore.prototype.removePlayer = function (socket, id) {
    //this.io.emit('removePlayer', id);
    this.playerController.remove(socket);
};
ServerCore.prototype.removeShip = function (socket) {
    //this.io.emit('removePlayer', id);
    this.shipController.remove(socket);
};
ServerCore.prototype.getPlayerShipId = function (socket) {
    return this.shipController.get(socket);
};
ServerCore.prototype.addPlayer = function (socket) {
    this.playerController.add(socket);
};
ServerCore.prototype.addShip = function (selectedShip, socket) {
    let currentPlayer, playerFound;

    if (selectedShip !== undefined)
    {
        this.playerController.entities.some(function (player) {
            if (player.Id === socket.client.id) {
                currentPlayer = player;
                playerFound = true;
                return true;
            }
        });
        console.log("New ship created for: " + socket.client.id);
        this.shipController.add(currentPlayer, selectedShip);
    }
};

ServerCore.prototype.broadcastUserStatus = function (dcStatusModel) {
    this.io.emit('playerDisconnected', dcStatusModel);
};
ServerCore.prototype.feedShip = function (feedModel) {
    let supplyIndex = this.supplyController.supplyItems.findIndex(x => x.supplyId === feedModel.supplyId);
    let shipIndex = this.shipController.entities.findIndex(x => x.id ===  feedModel.shipId);
    if (supplyIndex > -1 && shipIndex > -1 )
    {
        let supplyVc = new THREE.Vector2(
            this.supplyController.supplyItems[supplyIndex].pos_x,
            this.supplyController.supplyItems[supplyIndex].pos_z );

        let shipVc = new THREE.Vector2(
            this.shipController.entities[shipIndex].pos_x,
            this.shipController.entities[shipIndex].pos_z );

        let distance = supplyVc.distanceTo( shipVc );
        if (distance < 10) {
            console.log("Ship eating the supply ! > shipid: "+ this.shipController.entities[shipIndex].id);
            // ship.sailors.forEach(function (sailor) {
            //     //TODO: ADD INCOME TO SAILORS
            // })
            this.supplyController.supplyItems[supplyIndex].isDeath = true;
        }
    }

};

ServerCore.prototype.messageHandler = function (ws, message) {
    let buf = new flatbuffers.ByteBuffer(message);
    let userInput = ClientInputPacket.ClientInputModel.ClientInput.getRootAsClientInput(buf);
    let eventType = userInput.ClientEventType();

    if (eventType === ClientInputPacket.ClientInputModel.ClientEventEnum.GET_WORLD_INFO ) {
        console.log("GET_WORLD_INFO EVENT TRIGGERED");

        let builder = new flatbuffers.Builder(0);
        Packet.Models.WorldInfoTable.startWorldInfoTable(builder);
        Packet.Models.WorldInfoTable.addHeight(builder, this.worldConfig.height);
        Packet.Models.WorldInfoTable.addWidth(builder, this.worldConfig.width);
        Packet.Models.WorldInfoTable.addLength(builder, this.worldConfig.length);
        Packet.Models.WorldInfoTable.addOffSetX(builder, this.worldConfig.offSetX);
        Packet.Models.WorldInfoTable.addOffSetY(builder, this.worldConfig.offSetY);
        Packet.Models.WorldInfoTable.addOffSetZ(builder, this.worldConfig.offSetZ);
        let worldInfo = Packet.Models.WorldInfoTable.endWorldInfoTable(builder);
        let supplyList = Packet.Models.UpdateModel.createSupplyCratesVector(builder, this.supplyController.GetAllSupplies(Packet, builder));
        Packet.Models.UpdateModel.startUpdateModel(builder);
        Packet.Models.UpdateModel.addSupplyCrates(builder, supplyList);
        Packet.Models.UpdateModel.addEventType(builder, Packet.Models.EventTypes.WorldInfoUpdate);
        Packet.Models.UpdateModel.addWorldInfo(builder, worldInfo);

        let updateModel = Packet.Models.UpdateModel.endUpdateModel(builder);
        builder.finish(updateModel);

        let buffer = builder.asUint8Array();

        console.log("World INFO LEN: "+ buffer.length);
        ws.send(buffer ,this.uws.options)
    }

};
ServerCore.prototype.startUws = function () {
    this.startTime = new Date().getTime();


    function noop() {}

    function heartbeat() {
        this.isAlive = true;
    }

    let self = this;

    function onMessage(message) {
        self.messageHandler(this, message);
    }

    self.uws.on('connection', function(ws) {
        console.log('Someone connected');
        ws.isAlive = true;
        ws.on('pong', heartbeat);
        ws.on('message', onMessage);
    });

    self.stateIntervalId = setInterval(function () { self.broadcastState(); }, 1000 / this.options.game.interval);
    self.supplyIntervalId = setInterval(function () { self.supplyController.spawnOneSupplyWithInterval(self.worldConfig, self.supplyConfig);}, 1000 / self.worldConfig.supplyRespawnSec);
    self.pingInterval = setInterval(function ping() {
        self.uws.clients.forEach(function each(ws) {
            if (ws.isAlive === false) return ws.terminate();

            ws.isAlive = false;
            ws.ping(noop);
        });
    }, 30000);
};

ServerCore.prototype.start = function () {
    this.startTime = new Date().getTime();
    let self = this;
    self.io.on('connection', function(socket){
        console.log("connection has been made");

        socket.on('getWorldInfo', function () {
            console.log("user wants to know world info > "+socket.client.id);
            socket.emit('getWorldInfo', self.worldConfig);
        });

        socket.on('newShip', function(data){
            console.log("new ship request from: " + socket.client.id);
            //data.playerId
            let selectedShip = self.shipConfig[data.shipType];
            self.addShip(selectedShip, socket)
        });
        socket.on('summonShip', function(data){
            //data.playerId
            //TODO: Get user's ship from database if needed.
        });
        socket.on('playerNew', function(){
            console.log("new player request from: " + socket.client.id);
            //data.playerId
            self.addPlayer(socket);
            console.log('new user created id: ' + socket.client.id);
        });
        socket.on('playerMove', function(data){
            let inputtime = new Date().getTime();
            //self.addPlayerInput(socket.client.id, 'playerMove', data, inputtime);
        });
        socket.on('feedShip', function(data){
            let inputtime = new Date().getTime();
            self.feedShip(data)
            //self.addPlayerInput(socket.client.id, 'playerMove', data, inputtime);
        });
        socket.on('disconnect', function(){
            let dcStatusModel = {userId: socket.client.id, shipId: self.getPlayerShipId(socket)};
            self.removePlayer(socket);
            self.removeShip(socket);
            self.broadcastUserStatus(dcStatusModel);
            console.log('user+ship deleted');
        });


    });

    //update per second
    self.supplyIntervalId = setInterval(function () { self.supplyController.spawnOneSupplyWithInterval(self.worldConfig, self.supplyConfig);}, 1000 / self.worldConfig.supplyRespawnSec);

};
