var mongoose = require('mongoose');

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
        Mã_môn_học : mã_môn_học
    },function(err,data){
        if(err) throw err;
        else if(data.length > 0){
            console.log('mã môn học đã tồn tại!');
        }
        else{
            model.collection('subjects').insertOne({
                Mã_môn_học : mã_môn_học,
                Tên_môn_học : tên_môn_học,
                Giảng_viên : giảng_viên,
                Ghi_chú : ghi_chú
            });
            res.redirect('/main/quan_ly_hoc_phan');
        }
    })
    
}

module.exports.Delete = function(req,res){  
    subjects.findOne({
        Mã_môn_học : req.params.id
    }).remove(function(err,data){
        if(err) throw err;
        else res.json(data);
    });
}

module.exports.Update = function(req,res){
    var mã_môn_học  = req.params.id;
    var tên_update = req.params.name;
    var giảng_viên_update = req.params.teach;
    var ghi_chú_update = req.params.note;
    
    var filter = {Mã_môn_học : mã_môn_học};
    var update = {
        Mã_môn_học : mã_môn_học,
        Tên_môn_học : tên_update,
        Giảng_viên : giảng_viên_update,
        Ghi_chú : ghi_chú_update
    }
    model.collection('subjects').update(filter,update,function(err,data){
        if(err) throw err;
        res.json(data);
        console.log(tên_update);
    })
}

module.exports.Upload = function(req,res){
}