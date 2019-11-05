$(document).ready(function(){
    $('table').on('click', '#delete', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('#mã_sinh_viên').text();
        var mã_môn_học = rowEl.find('#mã_môn_học').text();
        var todo = {
            Mã_sinh_viên : id,
            Mã_môn_học : mã_môn_học,
        }

        $.ajax({
            url: '/main/quan_ly_sinh_vien/duoc_thi/' + id ,
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
            var new_mã_môn_học = $('#mã_môn_học_update').val();
            var todo = {
                Mã_sinh_viên : id,
                Mã_môn_học : new_mã_môn_học,
            }
            console.log('submit!' + new_mã_môn_học);
        $.ajax({
            url : '/main/quan_ly_sinh_vien/duoc_thi/' + id +'/'+ new_mã_môn_học,
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
            url : '/main/quan_ly_sinh_vien/duoc_thi/upload/' + files[0].name,
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
    });

})
// tree view

$(document).ready(function() {
    $('.treeview').mdbTreeview();
  });