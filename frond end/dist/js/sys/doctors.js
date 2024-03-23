let doctorsData = [];
permission.doctorsAdd==0?$('#btnAddDoctor').remove():'';
// get doctors Data
let getDoctors = () => {
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/doctors`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            doctorsData = result;
            showDoctors();
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

let showDoctors = () => {
    if ( $.fn.dataTable.isDataTable( '#doctorsTbl' ) ) {
        $('#doctorsTbl').DataTable().destroy();
    }
    $('#doctorsContent').empty();
    if(doctorsData.length>0){
        $.each(doctorsData, (k,v)=>{
            var $tr = $('<tr />', {id:k});
            $tr.append(
                $('<td />', {html:`${k+1}`}),
                $('<td />', {html:`${v.first_name} ${v.last_name}<br> <small>Specialist: ${v.specialist}</small>`}),
                $('<td />', {html:`${v.phone_no}`}),
                $('<td />', {class:'text-right'}).append(
                    `<button type="button" class="btn btn-warning btnUpdate btn-sm" title="Update doctor"><i class="fas fa-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btnDelete btn-sm" title="Delete doctor"><i class="fas fa-trash"></i> Delete</button>`
                ),
            );
            
            $('#doctorsContent').append($tr);
        })
    }
    permission.doctorsUpdate==0?$('.btnUpdate').remove():'';
    permission.doctorsDelete==0?$('.btnDelete').remove():'';
    //Buttons examples
    $("#doctorsTbl").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#doctorsTbl_wrapper .col-md-6:eq(0)');
}

$(document).on('click','#btnAddDoctor',()=>{
    $('#doctor-modal').modal('show');
    $('.modal-title').html('Create Doctor');
    $('input').val('');
    $('#btnModalSave').unbind().on('click',function(){
        let data = adminData;
        $.each($('#doctorForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/doctor/create`,
            type: "POST",
            // dataType: "json",
            // contentType:'application/json',
            data: data,
            success: function(result){
                console.log(result);
                getDoctors();
                $('#doctor-modal').modal('hide');
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
    $('#doctor-modal').modal('show');
    $('.modal-title').html('Edit Doctor');
    var k = $(this).parents('tr').attr('id');
    $('#first_name').val(doctorsData[k].first_name);
    $('#last_name').val(doctorsData[k].last_name);
    $('#specialist').val(doctorsData[k].specialist);
    $('#phone_no').val(doctorsData[k].phone_no);
    $('#btnModalSave').unbind().on('click', function(){
        let data = adminData;
        $.each($('#doctorForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/doctor/update/${doctorsData[k].id}`,
            type: "PUT",
            // dataType: "json",
            // contentType:'application/json',
            data: data,
            success: function(result){
                toastr.success("Successfully Updated.");
                getDoctors();
                $('#doctor-modal').modal('hide');
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
                url:`${apiUrl}api/doctor/delete/${doctorsData[k].id}`,
                type: "DELETE",
                data: data,
                success: function(result){
                    toastr.success(result);
                    getDoctors();
                    
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
    getDoctors();
})