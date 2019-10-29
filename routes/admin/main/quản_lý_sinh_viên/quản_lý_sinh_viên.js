var express = require('express');

var route = express.Router();

var controller = require('../../../../controller/admin/main/quản_lý_sinh_viên/quản_lý_sinh_viên');

route.get('/',controller.Open);

route.post('/',controller.Add_One);

route.delete('/:id',controller.Delete);

route.put('/:id/:name_sv/:birth/:class',controller.Update);

route.post('/upload/:name',controller.upload.single('file_name'),controller.Upload);

module.exports = route;