 let baseUrl = `http://localhost/LAS/`;
 let apiUrl = `http://localhost:8080/`;

 let adminData = {};

// let adminSession = {
//   id:2,
//   name:'Admin'
// };
var adminSession = JSON.parse(localStorage.getItem('labSys'));
var permission = '';
console.log(adminSession);
//console.log(permission);
if(adminSession == null && (baseUrl+'login.html' != location.href)){
    logOut();
}else{
    $('#userName').html(adminSession.name);
    if(adminSession.img){
        // $('#userImg').attr('src', baseUrl+'/uploads/profiles/'+adminSession.img);
    }
    if(adminSession.permission){
        permission = JSON.parse(adminSession.permission);
    }
    $(document).on('click', '.navRefresh', function(){
        $(this).find('i').addClass('fa-spin');
        location.reload();
    });
    $(function(){
//        getNotifications();
        setPermission();
        
    });
}

$('.btnLogout').on('click' ,function(){
  logOut();
});

function setPermission(){
  console.log(permission);
  if(permission){
      $.each(permission, function(key, val){
          var ul = $('ul.nav-sidebar')
          var li = ul.find('#li'+key).length;
          li == 1 && val == 1?$('#li'+key).show():$('#li'+key).remove();
      });
  }else{
      logOut();
  }
}

function logOut(){
  localStorage.removeItem('labSys');
  location.assign(baseUrl+'login.html');
}

let showError = (msg)=>{
  toastr.danger(msg);
}

function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addZero(val){
  if (val >= 10)
    return val;
  else
    return `0${val}`;
}