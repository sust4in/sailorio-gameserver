const config = require('../config/game');
const socketioJwt = require("socketio-jwt");
const { JWT_SECRET } = require('../config/vars');

exports = module.exports = ServerCore;

function ServerCore(socket) {
    this.options = config;
    this.io = socket;
    this.lastUpdateTime = 0;
    this.updatePassTime = null;
}

ServerCore.prototype.broadcastState = function () {
    var serverTime = new Date().getTime() - this.startTime;
    this.updatePassTime = serverTime - this.lastUpdateTime;
    this.lastUpdateTime = serverTime;

    var i = 0;
    var state = { currTime: serverTime};
    //logger.info('gameState:',state);
    var updateTime = new Date().getTime() / 1000.00000;
    state.updateTime = updateTime.toFixed(3);
    state.updatePassTime = this.updatePassTime;
    this.io.emit('updateState', state);

};

ServerCore.prototype.start = function () {
    this.startTime = new Date().getTime();
    var self = this;

    self.io.on('connection', function(socket){
        //TODO: Hold Secret Token for auth when connected.
        console.log("connection has been made")

        socket.on('newPlayer', function(data){
            //TODO: AUTH CHECKS

        });

        socket.on('movePlayer', function(data){

            var inputtime = new Date().getTime();
            //TODO: AUTH CHECKS
            //self.addPlayerInput(socket.client.id, 'move', data, inputtime);
        });


    });

    //update per second
    this.stateIntervalId = setInterval(function () { self.broadcastState(); }, 1000 / this.options.game.interval);

};
