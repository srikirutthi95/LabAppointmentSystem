let centersData = [];
permission.centersAdd==0?$('#btnAddCenter').remove():'';
// get centers Data
let getCenters = () => {
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/centers`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            centersData = result;
            showCenters();
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

let showCenters = () => {
    if ( $.fn.dataTable.isDataTable( '#centersTbl' ) ) {
        $('#centersTbl').DataTable().destroy();
    }
    $('#centersContent').empty();
    if(centersData.length>0){
        $.each(centersData, (k,v)=>{
            var $tr = $('<tr />', {id:k});
            $tr.append(
                $('<td />', {html:`${k+1}`}),
                $('<td />', {html:`${v.name}<br> <small>Code:${v.code}</small>`}),
                $('<td />', {html:`${v.discount}`}),
                $('<td />', {class:'text-right'}).append(
                    `<button type="button" class="btn btn-warning btnUpdate btn-sm" title="Update center"><i class="fas fa-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btnDelete btn-sm" title="Delete center"><i class="fas fa-trash"></i> Delete</button>`
                ),
            );
            
            $('#centersContent').append($tr);
        })
    }
    
    permission.centersUpdate==0?$('.btnUpdate').remove():'';
    permission.centersDelete==0?$('.btnDelete').remove():'';
    //Buttons examples
    $("#centersTbl").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#centersTbl_wrapper .col-md-6:eq(0)');
}

$(document).on('click','#btnAddCenter',()=>{
    $('#center-modal').modal('show');
    $('.modal-title').html('Create Center');
    $('input').val('');
    $('#btnModalSave').unbind().on('click',function(){
        let data = adminData;
        $.each($('#centerForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/centers/create`,
            type: "POST",
            // dataType: "json",
            // contentType:'application/json',
            data: data,
            success: function(result){
                console.log(result);
                getCenters();
                $('#center-modal').modal('hide');
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

$(document).on('click','.btnUpdate',function(){
    $('#center-modal').modal('show');
    $('.modal-title').html('Edit Center');
    var k = $(this).parents('tr').attr('id');
    $('#code').val(centersData[k].code);
    $('#name').val(centersData[k].name);
    $('#discount').val(centersData[k].discount);
    $('#btnModalSave').unbind().on('click', function(){
        let data = adminData;
        $.each($('#centerForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/centers/update/${centersData[k].id}`,
            type: "PUT",
            // dataType: "json",
            // contentType:'application/json',
            data: data,
            success: function(result){
                toastr.success("Successfully Updated.");
                getCenters();
                $('#center-modal').modal('hide');
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
                url:`${apiUrl}api/centers/delete/${centersData[k].id}`,
                type: "DELETE",
                data: data,
                success: function(result){
                    toastr.success(result);
                    getCenters();
                    
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
    getCenters();
})