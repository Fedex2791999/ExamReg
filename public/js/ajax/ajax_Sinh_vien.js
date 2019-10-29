$(document).ready(function(){
    $('table').on('click', '#delete', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('#mã_sinh_viên').text();
        var họ_và_tên = rowEl.find('#họ_và_tên').text();
        var năm_sinh = rowEl.find('#năm_sinh').text();
        var lớp = rowEl.find('#lớp').text();
        var todo = {
            Mã_sinh_viên : id,
            Họ_và_tên : họ_và_tên,
            Năm_sinh : năm_sinh,
            Lớp : lớp
        }

        $.ajax({
            url: '/main/quan_ly_sinh_vien/' + id ,
            type: 'DELETE',
            data : todo,
            success: function(data) {
                location.reload();
            }
        });
    });

    $("table").on('click','#update',function(){
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('#mã_sinh_viên').text();
        $('.modal_update').on('click','#sub_update',function(e){
            e.preventDefault();
            var new_tên = $('#họ_và_tên_update').val();
            var new_năm_sinh = $('#năm_sinh_update').val();
            var new_lớp = $('#lớp_update').val();
            var todo = {
                Mã_sinh_viên : id,
                Họ_và_tên : new_tên,
                Năm_sinh : new_năm_sinh,
                lớp : new_lớp   
            }
            console.log('submit!' + new_tên);
        $.ajax({
            url : '/main/quan_ly_sinh_vien/' + id +'/'+ new_tên + '/' + new_năm_sinh + '/'+ new_lớp,
            type : 'PUT',
            data : todo,
            success : function(){
                console.log('PUT DONE!');
                location.reload();
            }
        });

        });
    });

    $('#form_excel').on('submit',function(e){
        e.preventDefault();
        var files = $('#file_name').get(0).files;
        var formData = new FormData();
        if(files.length === 0){
            alert('choose file upload');
            return false;
        }

        for(var i=0;i<files.length;i++){
            var file = files[i];
            formData.append('file_name',file,file.name);
        }
        $.ajax({
            url : '/main/quan_ly_sinh_vien/upload/' + files[0].name,
            method : 'POST',
            data : formData,
            processData : false,
            contentType : false,
            success : function(){
                console.log('upload success!');
            },
            crossDomain : true
        })
    });

})