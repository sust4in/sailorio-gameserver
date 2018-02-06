const config = require('../config/game');
const THREE = require('three');

const socketioJwt = require("socketio-jwt");
const { JWT_SECRET } = require('../config/vars');

const YAML = require('yamljs');

const SupplyController = require("./controllers/supply.controller");
const PlayerController = require("./controllers/player.controller");
const ShipController = require("./controllers/ship.controller");
const EntityController = require("./controllers/entity.controller");

exports = module.exports = ServerCore;

function ServerCore(socket) {
    this.options = config;
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
    let serverTime = new Date().getTime() - this.startTime;
    //spawn supply
    this.supplyController.spawnOneSupply(this.worldConfig, this.supplyConfig);

    this.updatePassTime = serverTime - this.lastUpdateTime;
    this.lastUpdateTime = serverTime;
    let i = 0;

    let state = {
        currTime: serverTime,
        supplyCrates: this.supplyController.GetAllSupplies(),
        shipModels: this.shipController.GetAllShips(),
        svTickRate: this.options.game.interval };

    this.supplyController.supplyItems =this.supplyController.supplyItems.filter(function(item) {
        return item.isDeath === false
    });

    let updateTime = new Date().getTime() / 1000.00000;
    state.updateTime = updateTime.toFixed(3);
    state.updatePassTime = this.updatePassTime;
    this.io.emit('worldUpdate', state);
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
    else {
        console.log("Possible supply feed hack detected ! ")
    }
};

ServerCore.prototype.start = function () {
    this.startTime = new Date().getTime();
    var self = this;
    this.supplyController.spawnOneSupply(this.worldConfig, this.supplyConfig);
    self.io.on('connection', function(socket){
        console.log("connection has been made");

        //TODO: TEMP
        //********************************


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
    self.stateIntervalId = setInterval(function () { self.broadcastState(); }, 1000 / this.options.game.interval);

};
