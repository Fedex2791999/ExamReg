var mongoose = require('mongoose');
var multer = require('multer');
var xlsx = require('mongo-xlsx');


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
        id_student : mã_sinh_viên
    },function(err,data){
        if(err) throw err;
        else if(data.length > 0){
            console.log('mã sinh viên đã tồn tại!');
        }
        else{
            model.collection('students').insertOne({
                id_student : mã_sinh_viên,
                name_student : họ_và_tên,
                birth_student : năm_sinh,
                password_student : mã_sinh_viên,
                class : lớp
            });
            res.redirect('/main/quan_ly_sinh_vien');
        }
    })
    
}

module.exports.Delete = function(req,res){  
    students.findOne({
        id_student : req.params.id
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
    
    var filter = {id_student : mã_sinh_viên};
    var update = {
        id_student : mã_sinh_viên,
        name_student : tên_update,
        birth_student : năm_sinh_update,
        class : lớp_update
    }
    console.log('den day chưa?');
    model.collection('students').update(filter,update,function(err,data){
        if(err) throw err;
        res.json(data);
        console.log(tên_update);
    })
}

var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./upload/students');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})

module.exports.upload = multer({storage : storage});


module.exports.Upload = function(req,res){
    var name = req.params.name;
    
    xlsx.xlsx2MongoData("./upload/students/"+name, null, function(err, mongoData) {
        for(var i=0;i<mongoData.length;i++){
            model.collection('students').insertOne(mongoData[i],function(err,data){
                if(err) throw err;
                else console.log('done!  Time:' + Date.now());
            })
        }

      });
}