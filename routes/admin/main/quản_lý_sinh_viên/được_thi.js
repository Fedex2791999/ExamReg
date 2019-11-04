var express = require('express');

var route = express.Router();

var controller = require('../../../../controller/admin/main/quản_lý_sinh_viên/được_thi');

route.get('/',controller.Open);

route.post('/',controller.Add_One);

route.delete('/:id',controller.Delete);

route.put('/:id/:name',controller.Update);

route.post('/upload/:name',controller.upload.single('file_name'),controller.Upload);

module.exports = route;