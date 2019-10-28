var express = require('express');
var route = express.Router();

var controller = require('../../../controller/admin/login/login');

route.get('/',controller.Open);

route.post('/',controller.Login);

module.exports = route;