var mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/examReg_DB');


var adminSchema = new mongoose.Schema({
    username : String,
    password : String
});

var admins = mongoose.model('admins',adminSchema);



module.exports = admins;