$(document).on('keydown', function(e){
    var key = e.which;
    if(key == 13)  // the enter key code
     {
       $('#submitLogin').trigger('click'); 
     }
});
$('#submitLogin').on('click', function(){
    $('.login-box-msg').html('Please Wait... verifying authentication').addClass('text-blue');
    $('#submitLogin').html('<i class="fas fa-sync-alt fa-spin"></i>');
    let data = {};
    data.uname = $('#inputUname').val();
    data.pwd = $('#inputPassword').val();
    console.log(data);
    $.ajax({
        url: `${apiUrl}api/login`,
        type: "POST",
        data: data,
        success: function(result){
            console.log(result);
            if(result.length>0)
            {
                $('.login-box-msg').html('Redirecting...').addClass('text-green');
                let adminSession = {
                    id:result[0].id,
                    name:`${result[0].first_name} ${result[0].last_name}`,
                    permission: result[0].permission
                };
                // console.log(adminSession);
                localStorage.setItem('labSys', JSON.stringify(adminSession));
                setTimeout(function(){
                    location.assign(baseUrl);
                }, 2000);
            }
            else
            {
                $('.login-box-msg').html("Credential Faild.");
                $('.login-box-msg').addClass('text-red');
                $('#submitLogin').html('Retry'); 
            }
        },
        fail: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
            
        }
    });
});