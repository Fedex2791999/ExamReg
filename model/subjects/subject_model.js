var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/examReg_DB');

var subjectSchema = mongoose.Schema({
    id_subject : String,
    name_subject : String,
    lecturers_subject : String,
    note : String
})

var subjects = mongoose.model('subjects',subjectSchema);

module.exports = subjects;