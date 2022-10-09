const express = require('express');
const routes = require('./routes/index.js');
require('dotenv').config();

const app = express();
routes(app);

module.exports = app;