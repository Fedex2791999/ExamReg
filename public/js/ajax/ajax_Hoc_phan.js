$(document).ready(function(){
    $('table').on('click', '#delete', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('#mã_môn_học').text();
        var tên_môn_học = rowEl.find('#tên_môn_học').text();
        var giảng_viên = rowEl.find('#giảng_viên').text();
        var ghi_chú = rowEl.find('#ghi_chú').text();
        var todo = {
            Mã_môn_học : id,
            Tên_môn_học : tên_môn_học,
            Giảng_viên : giảng_viên,
            Ghi_chú : ghi_chú
        }

        $.ajax({
            url: '/main/quan_ly_hoc_phan/' + id ,
            type: 'DELETE',
            data : todo,
            success: function(data) {
                location.reload();
            }
        });
    });

    $("table").on('click','#update',function(){
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('#mã_môn_học').text();
        $('.modal_update').on('click','#sub_update',function(e){
            e.preventDefault();
            var new_tên_môn_học = $('#tên_môn_học_update').val();
            var new_giảng_viên = $('#giảng_viên_update').val();
            var new_ghi_chú = $('#ghi_chú_update').val();
            var todo = {
                Mã_môn_học : id,
                Tên_môn_học : new_tên_môn_học,
                Giảng_viên : new_giảng_viên,
                Ghi_chú : new_ghi_chú   
            }
            console.log('submit!' + new_ghi_chú);
        $.ajax({
            url : '/main/quan_ly_hoc_phan/' + id +'/'+ new_tên_môn_học + '/' + new_giảng_viên +'/'+new_ghi_chú,
            type : 'PUT',
            data : todo,
            success : function(data){
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
            url : '/main/quan_ly_hoc_phan/upload/' + files[0].name,
            method : 'POST',
            data : formData,
            processData : false,
            contentType : false,
            success : function(){
                console.log('upload success!');
                location.reload();
            },
            crossDomain : true
        })
    })
});


