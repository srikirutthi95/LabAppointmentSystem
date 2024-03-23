let categoriesData = [];
permission.testingAdd==0?$('#btnAddTestCate').remove():'';
// get Categories Data
let getCategoriesData = () => {
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/testCategories`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            categoriesData = result;
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
    if ( $.fn.dataTable.isDataTable( '#categoriesTbl' ) ) {
        $('#categoriesTbl').DataTable().destroy();
    }
    $('#categoriesContent').empty();
    if(categoriesData.length>0){
        $.each(categoriesData, (k,v)=>{
            var $tr = $('<tr />', {id:k});
            $tr.append(
                $('<td />', {html:`${k+1}`}),
                $('<td />', {html:`${v.category_name}`}),
                $('<td />', {html:`${v.reference}`}),
                $('<td />', {html:`${v.amount}`}),
                $('<td />', {class:'text-right'}).append(
                    `<button type="button" class="btn btn-success btnViewTest btn-sm" title="View test"><i class="fas fa-file"></i> View Tests</button>
                    <button type="button" class="btn btn-warning btnUpdate btn-sm" title="Update test"><i class="fas fa-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btnDelete btn-sm" title="Delete test"><i class="fas fa-trash"></i> Delete</button>`
                ),
            );
            
            $('#categoriesContent').append($tr);
        })
    }
    permission.testing==0?$('.btnViewTest').remove():'';
    permission.testingUpdate==0?$('.btnUpdate').remove():'';
    permission.testingDelete==0?$('.btnDelete').remove():'';
    //Buttons examples
    $("#categoriesTbl").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#categoriesTbl_wrapper .col-md-6:eq(0)');
}

$(document).on('click','#btnAddTestCate',()=>{
    $('#category-modal').modal('show');
    $('.modal-title').html('Create Test Category');
    $('input').val('');
    $('#btnModalSave').unbind().on('click',function(){
        let data = adminData;
        $.each($('#categoryForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/testCategories/create`,
            type: "POST",
            data: data,
            success: function(result){
                console.log(result);
                getCategoriesData();
                $('#category-modal').modal('hide');
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

$(document).on('click', '.btnViewTest', function(){
    var k = $(this).parents('tr').attr('id');
    location.assign(`${baseUrl}tests/tests.html?id=${categoriesData[k].id}`)
})

$(document).on('click','.btnUpdate',function(){
    $('#category-modal').modal('show');
    $('.modal-title').html('Edit Test Category');
    var k = $(this).parents('tr').attr('id');
    $('#category_name').val(categoriesData[k].category_name);
    $('#amount').val(categoriesData[k].amount);
    $('#reference').val(categoriesData[k].reference);
    $('#comments').val(categoriesData[k].comment);
    $('#btnModalSave').unbind().on('click', function(){
        let data = adminData;
        $.each($('#categoryForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/testCategories/update/${categoriesData[k].id}`,
            type: "PUT",
            // dataType: "json",
            // contentType:'application/json',
            data: data,
            success: function(result){
                toastr.success("Successfully Updated.");
                getCategoriesData();
                $('#category-modal').modal('hide');
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
                url:`${apiUrl}api/testCategories/delete/${categoriesData[k].id}`,
                type: "DELETE",
                data: data,
                success: function(result){
                    toastr.success(result);
                    getCategoriesData();
                    
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
    getCategoriesData();
})