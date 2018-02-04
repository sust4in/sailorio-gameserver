const config = require('../config/game');

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
    this.supplyRespawnSec = 5;
    this.lastSupplyRespawnTime = null;
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

    let updateTime = new Date().getTime() / 1000.00000;
    state.updateTime = updateTime.toFixed(3);
    state.updatePassTime = this.updatePassTime;
    this.io.emit('worldUpdate', state);
};

ServerCore.prototype.removePlayer = function (socket, id) {
    //this.io.emit('removePlayer', id);
    this.playerController.remove(socket);
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
        console.log("New ship created for: " + socket.client.id)
        this.shipController.add(currentPlayer, selectedShip)
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

        socket.on('disconnect', function(){
            let playerObjectId = {id: socket.client.id};
            self.removePlayer(socket, playerObjectId);
            console.log('user deleted');

        });


    });

    //update per second
    self.stateIntervalId = setInterval(function () { self.broadcastState(); }, 1000 / this.options.game.interval);

};
