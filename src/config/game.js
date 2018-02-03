var config = {};

config.game = {};
config.game.interval = process.env.SERVER_INTERVAL || 15;

module.exports = config;