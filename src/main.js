Promise = require('bluebird'); // eslint-disable-line no-global-assign
global.__base = __dirname + '/';

const { port, env } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const ServerCore = require('./game/core');
const io = require('socket.io');
// open mongoose connection
mongoose.connect();

// listen to requests
const expressserver = app.listen(port, () => console.info(`Game server started on port ${port} (${env})`));
const ioServer  = io(expressserver);
const server = new ServerCore(ioServer);
server.start();
/**
 * Exports express
 * @public
 */

module.exports = app;
