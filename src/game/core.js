const config = require('../config/game');
const socketioJwt = require("socketio-jwt");
const { JWT_SECRET } = require('../config/vars');
const YAML = require('yamljs');
const supplyController = require("./controllers/supply.controller");

exports = module.exports = ServerCore;

function ServerCore(socket) {
    this.options = config;
    this.io = socket;
    this.lastUpdateTime = 0;
    this.updatePassTime = null;
    this.worldConfig = YAML.load(__base + "config/gamesettings/world.yaml");
    this.supplyController = new supplyController();
    this.supplyConfig = YAML.load(__base + "config/gamesettings/supplies.yaml");
    this.supplyRespawnSec = 5;
    this.lastSupplyRespawnTime = null;
    this.worldConfig.worldLeftX = this.worldConfig.offSetX - (this.worldConfig.width / 2);
    this.worldConfig.worldUpZ = (this.worldConfig.length / 2) - this.worldConfig.offSetZ;
    this.worldConfig.worldRightX = (this.worldConfig.width / 2) - this.worldConfig.offSetX;
    this.worldConfig.worldDownZ = this.worldConfig.offSetZ - (this.worldConfig.length / 2);
}

ServerCore.prototype.broadcastState = function () {
    var serverTime = new Date().getTime() - this.startTime;
    //spawn supply
    this.supplyController.spawnOneSupply(this.worldConfig, this.supplyConfig);

    this.updatePassTime = serverTime - this.lastUpdateTime;
    this.lastUpdateTime = serverTime;
    let i = 0;
    let state = { currTime: serverTime, supplyCrates: this.supplyController.GetAllSupplies(), svTickRate: this.options.game.interval };
    let updateTime = new Date().getTime() / 1000.00000;
    state.updateTime = updateTime.toFixed(3);
    state.updatePassTime = this.updatePassTime;
    this.io.emit('worldUpdate', state);
};

ServerCore.prototype.start = function () {
    this.startTime = new Date().getTime();
    var self = this;
    this.supplyController.spawnOneSupply(this.worldConfig, this.supplyConfig);
    self.io.on('connection', function(socket){
        //TODO: Hold Secret Token for auth when connected.
        console.log("connection has been made");
        socket.on('getWorldInfo', function () {
            console.log("user wants to know world info > "+socket.client.id);
            socket.emit('getWorldInfo', self.worldConfig);
        });

        socket.on('newPlayer', function(data){

        });

        socket.on('playerMove', function(data){
            var inputtime = new Date().getTime();
            self.addPlayerInput(socket.client.id, 'playerMove', data, inputtime);
        });


    });

    //update per second
    self.stateIntervalId = setInterval(function () { self.broadcastState(); }, 1000 / this.options.game.interval);

};
