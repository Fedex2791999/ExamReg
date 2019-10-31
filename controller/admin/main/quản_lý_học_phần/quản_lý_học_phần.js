var mongoose = require('mongoose');
var multer = require('multer');
var xlsx = require('mongo-xlsx');


mongoose.connect('mongodb://localhost/examReg_DB');

var model = mongoose.connection;

var subjects = require('../../../../model/subjects/subject_model');

module.exports.Open = function(req,res){
    subjects.find({},function(err,data){
        if(err) throw err;
        else{
            res.render('./admin/main/quản_lý_học_phần/quản_lý_học_phần',{todo : data});
        }
    })
}

module.exports.Add_One = function(req,res){
    var mã_môn_học = req.body.mã_môn_học;
    var tên_môn_học = req.body.tên_môn_học;
    var giảng_viên = req.body.giảng_viên;
    var ghi_chú = req.body.ghi_chú;
    subjects.find({
        id_subject : mã_môn_học
    },function(err,data){
        if(err) throw err;
        else if(data.length > 0){
            console.log('mã môn học đã tồn tại!');
        }
        else{
            model.collection('subjects').insertOne({
                id_subject : mã_môn_học,
                name_subject : tên_môn_học,
                lecturers_subject : giảng_viên,
                note : ghi_chú
            });
            res.redirect('/main/quan_ly_hoc_phan');
        }
    })
    
}

module.exports.Delete = function(req,res){  
    subjects.findOne({
        id_subject : req.params.id
    }).remove(function(err,data){
        if(err) throw err;
        else{ 
            res.json(data)
            console.log(data);
        }
    });
}

module.exports.Update = function(req,res){
    var mã_môn_học  = req.params.id;
    var tên_update = req.params.name;
    var giảng_viên_update = req.params.teach;
    var ghi_chú_update = req.params.note;
    
    var filter = {id_subject : mã_môn_học};
    var update = {
        id_subject : mã_môn_học,
        name_subject : tên_update,
        lecturers_subject : giảng_viên_update,
        note : ghi_chú_update
    }
    model.collection('subjects').update(filter,update,function(err,data){
        if(err) throw err;
        res.json(data);
        console.log(tên_update);
    })
}

var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./upload/subjects');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})

module.exports.upload = multer({storage : storage});


module.exports.Upload = function(req,res){
    var name = req.params.name;
    
    xlsx.xlsx2MongoData("./upload/subjects/"+name, null, function(err, mongoData) {
            model.collection('subjects').insertMany(mongoData,function(err,data){
                if(err) throw err;
                else console.log('done!  Time:' + Date.now());
            })
        res.redirect('/main/quan_ly_hoc_phan');
        console.log('insert subjects success!');
      });
}