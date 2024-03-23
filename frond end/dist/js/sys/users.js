let usersData = [];
permission.usersAdd==0?$('#btnAddUser').remove():'';
// get Users Data
let getUsers = () => {
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/users`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            usersData = result;
            showUsers();
        },
        fail: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            showError('Something went wrong! Please check your internet connection.');
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
            showError('Something went wrong!');
        }
    });
}

let showUsers = () => {
    if ( $.fn.dataTable.isDataTable( '#usersTbl' ) ) {
        $('#usersTbl').DataTable().destroy();
    }
    $('#usersContent').empty();
    if(usersData.length>0){
        $.each(usersData, (k,v)=>{
            var $tr = $('<tr />', {id:k});
            $tr.append(
                $('<td />', {html:`${k+1}`}),
                $('<td />', {html:`${v.first_name} ${v.last_name}`}),
                $('<td />', {html:`${v.phone_no}`}),
                $('<td />', {html:(v.status?`<span class="badge badge-success">Active</span>`:`<span class="badge badge-danger">Inactive</span>`)}),
                $('<td />', {class:'text-right'}).append(
                    `<button type="button" class="btn btn-info btnPermission btn-sm" title="User Permissions"><i class="fas fa-lock"></i> Set Permission</button>
                    <button type="button" class="btn btn-warning btnUpdate btn-sm" title="Update User"><i class="fas fa-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btnDelete btn-sm" title="Delete User"><i class="fas fa-trash"></i> Delete</button>`
                ),
            );
            
            $('#usersContent').append($tr);
        })
    }
    permission.usersPermission==0?$('.btnPermission').remove():'';
    permission.usersUpdate==0?$('.btnUpdate').remove():'';
    permission.usersDelete==0?$('.btnDelete').remove():'';
    //Buttons examples
    $("#usersTbl").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#usersTbl_wrapper .col-md-6:eq(0)');
}

let getUserRole = () => {
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/userRoles`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            $('#role').empty().append(`<option value="">Select Role</option>`);
            $.each(result, (k,v)=>{
                $('#role').append(`<option value="${v.id}">${v.role_name}</option>`)
            })
        },
        fail: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            showError('Something went wrong! Please check your internet connection.');
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
            showError('Something went wrong!');
        }
    });
}

$(document).on('click','#btnAddUser',()=>{
    $('#user-modal').modal('show');
    $('.modal-title').html('Create User');
    $('input, select').val('');
    $('#password').prop('disabled', false);
    $('#btnModalSave').unbind().on('click',function(){
        let data = adminData;
        $.each($('#userForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/user/create-user`,
            type: "POST",
            // dataType: "json",
            // contentType:'application/json',
            data: data,
            success: function(result){
                console.log(result);
                getUsers();
                $('#user-modal').modal('hide');
                toastr.success("Successfully Created.");
            },
            fail: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                showError('Something went wrong! Please check your internet connection.');
            },
            error: function (xhr, textStatus) {
                console.log(xhr);
                showError('Something went wrong!');
            }
        });
    })
})

$(document).on('click', '.btnPermission', function(){
    var k = $(this).parents('tr').attr('id');
    location.assign(`${baseUrl}users/setPermission.html?id=${usersData[k].id}`)
})

$(document).on('click','.btnUpdate',function(){
    $('#user-modal').modal('show');
    $('.modal-title').html('Edit User')
    var k = $(this).parents('tr').attr('id');
    $('#first_name').val(usersData[k].first_name);
    $('#last_name').val(usersData[k].last_name);
    $('#phone_no').val(usersData[k].phone_no);
    $('#address').val(usersData[k].address);
    $('#email').val(usersData[k].email);
    $('#user_name').val(usersData[k].user_name);
    $('#password').prop('disabled', true);
    $('#role').val(usersData[k].role).trigger('change');
    $('#btnModalSave').unbind().on('click', function(){
        let data = adminData;
        $.each($('#userForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/user/update-user/${usersData[k].id}`,
            type: "PUT",
            // dataType: "json",
            // contentType:'application/json',
            data: data,
            success: function(result){
                toastr.success("Successfully Updated.");
                getUsers();
                $('#user-modal').modal('hide');
            },
            fail: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                showError('Something went wrong! Please check your internet connection.');
            },
            error: function (xhr, textStatus) {
                console.log(xhr);
                showError('Something went wrong!');
            }
        });
    })
})

$(document).on('click', '.btnDelete', function(){
    var k = $(this).parents('tr').attr('id');
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            let data = adminData;
            $.ajax({
                url:`${apiUrl}api/user/delete-user/${usersData[k].id}`,
                type: "DELETE",
                data: data,
                success: function(result){
                    toastr.success(result);
                    getUsers();
                    
                },
                fail: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    showError('Something went wrong! Please check your internet connection.');
                },
                error: function (xhr, textStatus) {
                    console.log(xhr);
                    showError(xhr.responseJSON.message);
                }
            });
        }
      });
});
$(()=>{
    getUsers();
    getUserRole();
})