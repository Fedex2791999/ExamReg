var express = require('express');

var route = express.Router();

var controller = require('../../../../controller/admin/main/quản_lý_sinh_viên/cấm_thi');

route.get('/',controller.Open);

route.post('/',controller.Add_One);

route.delete('/:id',controller.Delete);

route.put('/:id/:tên_môn_học',controller.Update);

route.post('/upload/:name',controller.upload.single('file_name'),controller.Upload);

module.exports = route;