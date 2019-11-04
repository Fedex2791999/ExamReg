var mongoose = require('mongoose');
var multer = require('multer');
var xlsx = require('mongo-xlsx');


mongoose.connect('mongodb://localhost/examReg_DB');

var model = mongoose.connection;

var banned_students = require('../../../../model/student/banned_model');

module.exports.Open = function(req,res){
    banned_students.find({},function(err,data){
        if(err) throw err;
        else{
            res.render('./admin/main/quản_lý_sinh_viên/cấm_thi',{todo : data});
        }
    })
}

module.exports.Add_One = function(req,res){
    var mã_sinh_viên = req.body.mã_sinh_viên;
    var tên_môn_học = req.body.tên_môn_học;
    banned_students.find({
        id_student : mã_sinh_viên,
        name_subject : tên_môn_học
    },function(err,data){
        if(err) throw err;
        else if(data.length > 0){
            console.log('mã sinh viên đã tồn tại!');
        }
        else{
            model.collection('banned_students').insertOne({
                id_student : mã_sinh_viên,
                name_subject : tên_môn_học,
            });
            res.redirect('/main/quan_ly_sinh_vien/cam_thi');
        }
    })
    
}

module.exports.Delete = function(req,res){  
    banned_students.findOne({
        id_student : req.params.id
    }).remove(function(err,data){
        if(err) throw err;
        else {
            res.json(data);
            console.log(data);
        }

    });
}

module.exports.Update = function(req,res){
    console.log('heloo!!')
    var mã_sinh_viên  = req.params.id;
    var tên_môn_học = req.params.name;
    
    var filter = {id_student : mã_sinh_viên};
    var update = {
        id_student : mã_sinh_viên,
        name_subject : tên_môn_học
    }
    console.log('den day chua?');
    model.collection('banned_students').update(filter,update,function(err,data){
        if(err) throw err;
        res.json(data);
    })
}

var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./upload/students/cấm_thi');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})

module.exports.upload = multer({storage : storage});


module.exports.Upload = function(req,res){
    var name = req.params.name;
    
    xlsx.xlsx2MongoData("./upload/students/cấm_thi"+name, null, function(err, mongoData) {
            model.collection('students').insertMany(mongoData,function(err,data){
                if(err) throw err;
                else console.log('done!  Time:' + Date.now());
            })
        res.redirect('/main/quan_ly_sinh_vien/cam_thi')
        console.log('insert students success!');
      });
}