var mongoose = require('mongoose');
var admins = require('../../../model/admin/admin_model');

mongoose.connect('mongodb://localhost/examReg_DB'); 

var model = mongoose.connection;

module.exports.Open = function(req,res){
    res.render('./admin/login/login')
}

module.exports.Login = function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    model.collection('admins').findOne({
        username : username,
        password : password
    },function(err,data){
        if(err) throw err;
        else if (data == null){
            console.log('dang nhap that bai!');
        }
        else{
            console.log('dang nhap thanh cong!')
            res.redirect('/main');
        }
    })
}