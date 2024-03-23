let patientsData = [];
permission.patientsAdd==0?$('#btnAddPatient').remove():'';
// get centers Data
let getPatients = () => {
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/patients`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            patientsData = result;
            showPatients();
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

let showPatients = () => {
    if ( $.fn.dataTable.isDataTable( '#patientsTbl' ) ) {
        $('#patientsTbl').DataTable().destroy();
    }
    $('#patientsContent').empty();
    if(patientsData.length>0){
        $.each(patientsData, (k,v)=>{
            var $tr = $('<tr />', {id:k});
            $tr.append(
                $('<td />', {html:`${k+1}`}),
                $('<td />', {html:`${v.first_name}${v.last_name}`}),
                $('<td />', {html:`${v.gender=='M'?'Male':'Female'}`}),
                $('<td />', {html:`${v.age}`}),
                $('<td />', {html:`${v.phone_no}`}),
                $('<td />', {html:`${v.address}`}),
                $('<td />', {class:'text-right'}).append(
                    `<button type="button" class="btn btn-warning btnUpdate btn-sm" title="Update center"><i class="fas fa-edit"></i> Edit</button>
                    <button type="button" class="btn btn-danger btnDelete btn-sm" title="Delete center"><i class="fas fa-trash"></i> Delete</button>`
                ),
            );
            
            $('#patientsContent').append($tr);
        })
    }
    permission.patientsUpdate==0?$('.btnUpdate').remove():'';
    permission.patientsDelete==0?$('.btnDelete').remove():'';
    //Buttons examples
    $("#patientsTbl").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#patientsTbl_wrapper .col-md-6:eq(0)');
}

$(document).on('click','#btnAddPatient',()=>{
    $('#patient-modal').modal('show');
    $('.modal-title').html('Create Patient');
    $('input').val('');
    $('#btnModalSave').unbind().on('click',function(){
        let data = adminData;
        $.each($('#patientForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/patient/create`,
            type: "POST",
            // dataType: "json",
            // contentType:'application/json',
            data: data,
            success: function(result){
                console.log(result);
                getPatients();
                $('#patient-modal').modal('hide');
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
    $('#patient-modal').modal('show');
    $('.modal-title').html('Edit Patient');
    var k = $(this).parents('tr').attr('id');
    $('#first_name').val(patientsData[k].first_name);
    $('#last_name').val(patientsData[k].last_name);
    $('#address').val(patientsData[k].address);
    $('#phone_no').val(patientsData[k].phone_no);
    $('#email').val(patientsData[k].email);
    $('#gender').val(patientsData[k].gender);
    $('#age').val(patientsData[k].age);
    $('#btnModalSave').unbind().on('click', function(){
        let data = adminData;
        $.each($('#patientForm').serializeArray(), function(k,v){
            data[v.name] = v.value;
        });
        console.log(data)
        $.ajax({
            url: `${apiUrl}api/patient/update/${patientsData[k].id}`,
            type: "PUT",
            // dataType: "json",
            // contentType:'application/json',
            data: data,
            success: function(result){
                toastr.success("Successfully Updated.");
                getPatients();
                $('#patient-modal').modal('hide');
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
                url:`${apiUrl}api/patient/delete/${patientsData[k].id}`,
                type: "DELETE",
                data: data,
                success: function(result){
                    toastr.success(result);
                    getPatients();
                    
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
    getPatients();
})