//var userLevel = [];
var usersData = [];
var usersRoleData = [];
var url_string = location.href; //window.location.href
var url = new URL(url_string);
var userId = url.searchParams.get("id");
var permissions = [
    {name:'Users', color:'primary', action:['View','Add', 'Update', 'Delete', 'Permission']},
    {name:'Patients', color:'yellow', action:['View','Add', 'Update', 'Delete']},
    {name:'Doctors', color:'maroon', action:['View','Add', 'Update', 'Delete']},
    {name:'Testing', color:'red', action:['View','Add', 'Update', 'Delete']},
    {name:'Invoice', color:'yellow', action:['View','Add', 'Update', 'Delete', 'AddTests', 'ViewTests', 'UpdateTests']},
    {name:'Results', color:'primary', action:['View','Add', 'Update', 'Delete']},
    {name:'Centers', color:'primary', action:['View','Add', 'Update', 'Delete']},
    {name:'Payments', color:'success', action:['View','Add', 'Update', 'Delete']},
];
$(function(){
    if(userId){
        getUserData();
    }
    // getUserRole();
    // setCondent();
    $('#btnSave').on('click', function(){
        var data = {};
        var permission = {};
        $('#contentBody input[type=checkbox]').each(function(){
            var id = $(this).attr('id');
            data[id] = $(this).is(':checked')?1:0;
        });
//        type & method
        data.payType = 1
        data.payMethod = 1
        permission.id = userId;
        permission.permission = JSON.stringify(data);
        console.log(permission); 
        $.ajax({
            url: `${apiUrl}api/user/setPermission/${userId}`,
            type: "PUT",
            // dataType: "json",
            data: permission,
            success: function(result){
                console.log(result);
                toastr.success("Successfully set.");
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
    });
    $('input').on('change', function(){
//        console.log(this.id);
//        validateForm(this.id);
    });
});



function setUser(){
    // console.log(usersData);
    let htmlStr = '';
    var no = 0;
    if(usersData){
        $('#userTitle').html(`${usersData.first_name} ${usersData.last_name}`);
        userPermission = usersData.permission;
        console.log(userPermission);
        if(userPermission != null){
            userPermission = JSON.parse(userPermission);
           console.log(userPermission);
            $.each(userPermission, function (key, val) {
//                console.log(key + val);
                $('#'+key).prop('checked', (val == 1?true:false));
            });
        }
        $('.overlay').hide();
        
    }
}

//get user level and user data
function getUserData(){
    let data = adminData;
    data.id = userId;
    $.ajax({
        url: `${apiUrl}api/user/${userId}`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            usersData = result;
            setCondent();
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

// function getUserRole(){
//     let result = requestAjax("users/getUserRole");
//     console.log(result); 
//     if(result != false){    
//         if(result.status == true){
//             usersRoleData = result.usersRoleData;
//         }
//     }
// }

// function setUserRole(){
//     let htmlStr = '';
//     if(usersRoleData.length>0){
//         for(var i=0; i<usersRoleData.length; i++){
//             htmlStr += '<option value="'+usersRoleData[i].id+'">'+usersRoleData[i].role_name+'</option>';
//         }
//     }
//     $('#sltRole').html(htmlStr);
// }

function setCondent(){
    for(var i=0; i<permissions.length; i++){
//        console.log(permissions[i]);
        var action = permissions[i].action;
        let htmlStr = '<div class="col-lg-6 col-sm-12"><div class="card card-outline card-'+permissions[i].color+' collapsed-card"><div class="card-header"><h3 class="card-title">'+permissions[i].name+'</h3><div class="card-tools"><button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-plus"></i></button></div><!--/.card-tools--></div><!--/.card-header --><div class="card-body"><div class="row">';
        for(var j=0; j<action.length; j++){
            htmlStr += '<div class="col-lg-4 col-sm-6"><div class="form-group clearfix"><div class="icheck-'+permissions[i].color+' d-inline"><input type="checkbox" id="'+permissions[i].name.toLowerCase()+(action[j]!='View'?action[j]:'')+'"><label for="'+permissions[i].name.toLowerCase()+(action[j]!='View'?action[j]:'')+'"> '+action[j]+'</label></div></div></div>';
        }
        htmlStr += '</div></div></div></div>';
        $('#contentBody').append(htmlStr);
    }
    setUser();
}