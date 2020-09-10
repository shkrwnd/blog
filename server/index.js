// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');
const socket = require('socket.io');


// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912




module.exports = app;
