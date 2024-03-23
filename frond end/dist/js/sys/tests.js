let testsData = [];

var url = new URL(location.href);
var cat_id = JSON.parse(url.searchParams.get("id"));
// get Categories Data
let gettestsData = () => {
    testsData = [];
    let data = adminData;
    data.cat_id = cat_id;
    $.ajax({
        url: `${apiUrl}api/tests`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            testsData = result;
            showCategories();
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

let showCategories = () => {
    if ( $.fn.dataTable.isDataTable( '#testsTbl' ) ) {
        $('#testsTbl').DataTable().destroy();
    }
    $('#testsContent').empty();
    if(testsData.length>0){
        $.each(testsData, (k,v)=>{
            var $tr = $('<tr />', {id:k});
            $tr.append(
                $('<td />', {html:`${k+1}`}),
                $('<td />', {html:`${v.test_name}`}),
                $('<td />', {html:`${v.unit}`}),
                $('<td />', {html:`${v.reference}`}),
                $('<td />', {html:`${v.flag}`}),
                $('<td />', {class:'text-right'}).append(
                    `<button type="button" class="btn btn-warning btnUpdate btn-sm" title="Update test"><i class="fas fa-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btnDelete btn-sm" title="Delete test"><i class="fas fa-trash"></i> Delete</button>`
                ),
            );
            
            $('#testsContent').append($tr);
        })
    }
    //Buttons examples
    $("#testsTbl").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#testsTbl_wrapper .col-md-6:eq(0)');
}

$(document).on('click','#btnAddTest',()=>{
    $('#test-modal').modal('show');
    $('#btnModalSave').unbind().on('click',function(){
        let data = adminData;
        $.each($('#testForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        data.cat_id = cat_id;
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/test/create`,
            type: "POST",
            data: data,
            success: function(result){
                console.log(result);
                gettestsData();
                $('#test-modal').modal('hide');
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

$(document).on('click', '#btnBack', function(){
    location.assign(`${baseUrl}tests/testCategories.html`);
})

$(document).on('click','.btnUpdate',function(){
    $('#test-modal').modal('show');
    var k = $(this).parents('tr').attr('id');
    $('#test_name').val(testsData[k].test_name);
    $('#unit').val(testsData[k].unit);
    $('#reference').val(testsData[k].reference);
    $('#flag').val(testsData[k].flag);
    $('#btnModalSave').unbind().on('click', function(){
        let data = adminData;
        $.each($('#testForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        data.cat_id = cat_id;
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/test/update/${testsData[k].id}`,
            type: "PUT",
            // dataType: "json",
            // contentType:'application/json',
            data: data,
            success: function(result){
                toastr.success("Successfully Updated.");
                gettestsData();
                $('#test-modal').modal('hide');
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
                url:`${apiUrl}api/test/delete/${testsData[k].id}`,
                type: "DELETE",
                data: data,
                success: function(result){
                    toastr.success(result);
                    gettestsData();
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
    gettestsData();
})