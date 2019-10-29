var express = require('express');

var route = express.Router();

var controller = require('../../../../controller/admin/main/quản_lý_học_phần/quản_lý_học_phần');

route.get('/',controller.Open);

route.post('/',controller.Add_One);

route.delete('/:id',controller.Delete);

route.put('/:id/:name/:teach/:note',controller.Update);

route.post('/upload/:name',controller.upload.single('file_name'),controller.Upload);

module.exports = route;