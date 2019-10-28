var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/examReg_DB');

var model = mongoose.connection;

var students = require('../../../../model/student/student_model');

module.exports.Open = function(req,res){
    students.find({},function(err,data){
        if(err) throw err;
        else{
            res.render('./admin/main/quản_lý_sinh_viên/quản_lý_sinh_viên',{todo : data});
        }
    })
}

module.exports.Add_One = function(req,res){
    var mã_sinh_viên = req.body.mã_sinh_viên;
    var họ_và_tên = req.body.họ_và_tên;
    var năm_sinh = req.body.năm_sinh;
    var lớp = req.body.lớp;
    students.find({
        Mã_sinh_viên : mã_sinh_viên
    },function(err,data){
        if(err) throw err;
        else if(data.length > 0){
            console.log('mã sinh viên đã tồn tại!');
        }
        else{
            model.collection('students').insertOne({
                Mã_sinh_viên : mã_sinh_viên,
                Họ_và_tên : họ_và_tên,
                Năm_sinh : năm_sinh,
                Mật_khẩu : mã_sinh_viên,
                Lớp : lớp
            });
            res.redirect('/main/quan_ly_sinh_vien');
        }
    })
    
}

module.exports.Delete = function(req,res){  
    students.findOne({
        Mã_sinh_viên : req.params.id
    }).remove(function(err,data){
        if(err) throw err;
        else res.json(data);
    });
}

module.exports.Update = function(req,res){
    var mã_sinh_viên  = req.params.id;
    var tên_update = req.params.name_sv;
    var năm_sinh_update = req.params.birth;
    var lớp_update = req.params.class;
    
    var filter = {Mã_sinh_viên : mã_sinh_viên};
    var update = {
        Mã_sinh_viên : mã_sinh_viên,
        Họ_và_tên : tên_update,
        Năm_sinh : năm_sinh_update,
        Lớp : lớp_update
    }
    console.log('den day chưa?');
    model.collection('students').update(filter,update,function(err,data){
        if(err) throw err;
        res.json(data);
        console.log(tên_update);
    })
}