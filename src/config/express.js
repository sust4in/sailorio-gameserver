const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { logs } = require('./vars');
const routes = require('../game/routes/gamecore');
/**
 * Express instance
 * @public
 */
const app = express();
// request logging. dev: console | production: file
app.use(morgan(logs));
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());
// mount api v1 routes
app.use('/', routes);
module.exports = app;
