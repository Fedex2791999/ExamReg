// set module
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer');

var app = express();

// set engine
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('/views','./views');
app.use(express.static('public'));

// require các routes
// *admin
var loginAdmin = require('./routes/admin/login/login');
var mainAdmin = require('./routes/admin/main/main');
var quản_lý_học_phần = require('./routes/admin/main/quản_lý_học_phần/quản_lý_học_phần');
var quản_lý_sinh_viên = require('./routes/admin/main/quản_lý_sinh_viên/quản_lý_sinh_viên');
var cấm_thi = require('./routes/admin/main/quản_lý_sinh_viên/cấm_thi')
var được_thi = require('./routes/admin/main/quản_lý_sinh_viên/được_thi')
// ========================================================================================

// gọi các routes
// *admin
app.use('/adminLogin',loginAdmin);
app.use('/main',mainAdmin);
app.use('/main/quan_ly_hoc_phan',quản_lý_học_phần);
app.use('/main/quan_ly_sinh_vien',quản_lý_sinh_viên);
app.use('/main/quan_ly_sinh_vien/cam_thi',cấm_thi);
app.use('/main/quan_ly_sinh_vien/duoc_thi',được_thi);
// ===================================================

app.listen(3000,function(){
    console.log('server running in port 3000!')
});