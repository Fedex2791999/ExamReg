var express = require('express');

var route = express.Router();

var controller = require('../../../controller/admin/main/main');

route.get('/',controller.Open);

module.exports = route;