var invoiceData = [];
$(function(){
    getTestQueue();
    $(document).on('click', '.btnAddTestRslt', function(){
        location.assign(`${baseUrl}invoices/addTestRslt.html?id=${$(this).parents('tr').attr('id')}`);
    });
    $(document).on('click', '.btnDelete', function(){
        if(!$(this).hasClass('disabled')){
            var id = $(this).parents('tr').attr('id');
            deleteInvoice(id);
        }
    });
    // $(document).on('click', '.btnComplete', function(){
    //     if(!$(this).hasClass('disabled')){
    //         var id = $(this).parents('tr').attr('id');
    //         setCompleted(id);
    //     }
    // });
});

function getTestQueue(){
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/labQueue`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            invoiceData = result;
            showInvoice();
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

function showInvoice(){
    console.log(invoiceData);
    let htmlStr = '';
    var no = 0;
    if ( $.fn.dataTable.isDataTable( '#labQueueTbl' ) ) {
        $('#labQueueTbl').DataTable().destroy();
    }
    $('#labQueueContent').empty();
    if(invoiceData.length>0){
        $.each(invoiceData, (k,v)=>{
            no++;
            $('#labQueueContent').append(`
                <tr id ="${v.id}">
                    <td>${no}</td>
                    <td><span class="badge badge-info">Pt-${v.patient_id}</span> | ${v.p_first_name} ${v.p_last_name} | ${v.age} Yrs <span class="badge badge-success">${v.center_name ? v.center_name : ''}</span><br/><small>Invoice: ${v.invoice_no} Created: ${v.date}</small></td>
                    <td style="text-align:center;">
                        <button type="button" class="btn btn-outline-info btnAddTestRslt btn-sm" title="Add Test Result"><i class="fas fa-vial"></i> Add Results</button> 
                        <button type="button" class="btn btn-outline-danger btnDelete btn-sm" title="Delete Invoice"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `);
        })
        permission.invoiceAddTests == 0?$('.btnAddTestRslt').remove():'';
        permission.invoiceDelete == 0?$('.btnDelete').remove():'';
        
        $('#labQueueTbl').DataTable( {
            "responsive": true,
            "autoWidth": false,
        } );
        $('.overlay').hide();
    }
}

function setCompleted(invoiceId){
    let data = {id:invoiceId, status:1};
    let result = requestAjax("invoice/updateStatus", data);
//    console.log(result); 
    if(result != false){    
        if(result.status == true){
            Toast.fire({
                icon: 'success',
                title: 'Successfully Updated.'
            });
            getTestQueue();
        }
    }
}
//delete Invoice
function deleteInvoice(id){
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
            url:`${apiUrl}api/invoice/delete/${id}`,
            type: "DELETE",
            data: data,
            success: function(result){
                toastr.success(result);
                getTestQueue();
                
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
}