var patientData = [], invoiceData = [], testscategory = [];

let getPatients = () => {
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/patients`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            patientData = result;
            showPatient();
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
function showPatient(){
    $('#sltPatients').html('<option value="">Select Patient</option>');
    if(patientData.length>0){
        for(var i=0; i<patientData.length; i++){
           $('#sltPatients').append(`<option value="${patientData[i].id}" > Pt-${patientData[i].id} |${patientData[i].first_name} ${patientData[i].last_name} | ${patientData[i].phone_no} | Age: ${patientData[i].age}</option>`);
        }

        $('#sltPatients').select2({
            theme: 'bootstrap4'
        });
    }
}

$('#sltPatients').on('change', function(){
    var id = $(this).val();
    $(this).parents('.card').find('.overlay').show();
    setTimeout(function(){getInvoices(id)},1000);
});
$(document).on('click', '.btnGetTestRslt', function(){
    console.log($(this).parents('tr').attr('id'));
    var id = $(this).parents('tr').attr('id');
    $('#accordion').siblings('.overlay').show();
    setTimeout(function(){getInvoiceTestData(id)},1000);
});

function getInvoices(id){
    invoiceData =[];
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/patientInvoices/${id}`,
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
    var no = 0;
    if ( $.fn.dataTable.isDataTable( '#invoice_tbl' ) ) {
        $('#invoice_tbl').DataTable().destroy();
    }
    $('#tableContent').html('');
    $('#accordion').empty();
    if(invoiceData.length>0){ 
        for(var i=0; i<invoiceData.length; i++){
            let htmlStr = '';
            no++;
            // var discount = (invoiceData[i].discount > 0?invoiceData[i].discount:(invoiceData[i].centerDis?(invoiceData[i].total*invoiceData[i].centerDis)/100:0));
            // var netTotal = parseFloat(invoiceData[i].total) - discount;
            htmlStr += '<tr id ="'+invoiceData[i].id+'"><td>'+no+'</td>';
            htmlStr += `<td><span class="badge badge-info">Pt-${invoiceData[i].patient_id}</span> | Invoice: ${invoiceData[i].invoice_no} | ${invoiceData[i].age} Yrs ${invoiceData[i].status == 1 ? '<span class="badge badge-success">Completed</span>' : '<span class="badge badge-warning">Pending</span>'}<br/><small>${invoiceData[i].p_first_name} ${invoiceData[i].p_last_name} Created: ${invoiceData[i].date}</small></td>`;
            htmlStr += '<td style="text-align:right;">'+(invoiceData[i].status==1?'<button type="button" class="btn btn-outline-info btnGetTestRslt btn-sm" title="View Test Result"><i class="fas fa-vial"></i> View</button>':'')+' </td></tr>';
            $('#tableContent').append(htmlStr);
        }
        
        permission.results == 0?$('.btnGetTestRslt').remove():'';
        // permission.paymentsAdd == 1?$('.btnAddPayment').show():$('.btnAddPayment').remove();
    }
    $('#invoice_tbl').DataTable( {
        "responsive": true,
        "autoWidth": false,
    } );   
    $('.overlay').hide();
    toastr.success("Successfully loaded.");
    
}

function getInvoiceTestData(id){
    testscategory = [];
    let data = adminData;
    data.invoiceId = id;
    $.ajax({
        url:`${apiUrl}api/invoiceTests`,
        type: "POST",
        data: data,
        success: function(result){
            console.log(result)
            testscategory = result;
            showInvoiceTest();
            
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

function showInvoiceTest(){
    $('#accordion').empty();
    if(testscategory.length>0){
        for(var i=0; i<testscategory.length; i++){
            invTestResult = [];
            var testCategory = testscategory[i];
            let data = adminData;
            data.invoiceTestId = testCategory.id;
            $.ajax({
                url:`${apiUrl}api/testResult/getInvoiceTest`,
                type: "POST",
                data: data,
                async: false,
                success: function(result){
                    console.log(result);
                    invTestResult = result;
                    
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
            generateResult(testCategory, invTestResult);
        }
    }
    $('.btnPrint').on('click', function(){
        var id = $(this).parents('.card-success').attr('id');
        console.log(id);
        var ids = id.split('-');
        var invoiceId ='',  comments = '', tccomments = '', specimen , data ={};
        var title = $('#'+id).find('.card-header h3').html();
        var report_date = $('#'+id).find('.card-tools small').html();
        for(var i=0; i<testscategory.length; i++){
            if(testscategory[i].id == ids[1]){
                invoiceId = testscategory[i].invoice_id;
                comments = testscategory[i].comments;
                tccomments = testscategory[i].tccomments;
                specimen = testscategory[i].specimen;
                break;
            }
        }
        for(var i=0; i<invoiceData.length; i++){
            if(invoiceData[i].id == invoiceId){
                data = invoiceData[i];
                break;
            }
        }
        var printContents = '<html><head>';
        printContents += $('head').html();
        printContents += '</head><body><div class="card-body">';
        printContents += `<span style="font-size:1.1rem">SPECIMEN NO : ${data.invoice_no}</span><span class="float-right" style="font-size:1.1rem">SAMPLE DATE & TIME : ${data.date}</span><br>`;
        printContents += `<span style="font-size:1.1rem"><b>PATIENT NAME : ${data.p_first_name} ${data.p_last_name}</b></span><span class="float-right" style="font-size:1.1rem">REPORT DATE & TIME : ${report_date}</span><br>`;
        printContents += `<span style="font-size:1.1rem">GENDER : ${data.gender == 'M' ? 'MALE' : 'FEMALE'}</span><span class="float-right" style="font-size:1.1rem">INSTITUTION:${data.centerName ? data.centerName : '-'}</span><br>`;
        printContents += `<span style="font-size:1.1rem">AGE : ${data.age} Years</span><span class="float-right" style="font-size:1.1rem;">SPECIMEN : ${parseInt(specimen) == 1 ? 'BLOOD' : (parseInt(specimen) == 2 ? 'URINE' : 'FAECES')}</span><br>`;
        printContents += `<span style="font-size:1.1rem">REFERRED BY : ${data.d_first_name ? data.d_first_name : '-'} ${data.d_last_name ? data.d_last_name : '-'}</span><br><br><h4 style="text-align:center;">${title}</h4>`;
        printContents += $('#'+id).find('.card-body').html();
        printContents += '<br><br><b style="font-size:1.1rem">Comments :</b>';
        printContents += '<p>'+(comments?comments:'')+'</p>';
        printContents += (tccomments?tccomments:'');
        printContents += '</div></body></html>'
        var popupWin = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        popupWin.document.open();
        popupWin.document.write(printContents);
        popupWin.document.close();
        popupWin.focus();
        popupWin.onafterprint = function(){popupWin.close();};
        popupWin.onload = function() { 
            popupWin.print(); 
        }
    });
    $('#accordion').siblings('.overlay').hide();
}

function generateResult(testCategory, invTestResult){
    console.log(testCategory, invTestResult);
    var report_date = new Date(invTestResult[invTestResult.length-1].created_at);
    report_date.setMinutes(report_date.getMinutes()+((9*60)+30))
//                    report_date = report_date.addMinutes(30);
    report_date = `${report_date.getFullYear()}-${convertDate(report_date.getMonth() + 1)}-${convertDate(report_date.getDate())} ${convertDate(report_date.getHours())}:${convertDate(report_date.getMinutes())}:${convertDate(report_date.getSeconds())}`;

    let htmlStr = `<div class="card card-success collapsed-card" id="rslt-${testCategory.id}"><div class="card-header"><h3 class="card-title">${testCategory.category_name}</h3>`;

    htmlStr +=`<div class="card-tools"><small>${report_date}</small> <button type="button" class="btn btn-tool btnPrint"><i class="fas fa-print"></i></button> <button type="button" class="btn btn-tool" data-card-widget="maximize"><i class="fas fa-expand"></i></button> <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-plus"></i></button></div><!-- /.card-tools --></div><!-- /.card-header -->`;

    htmlStr +='<div class="card-body"><table class="table-sm" style="width:100%; font-size:1.1rem;"><thead style="border-top: 1px solid black; border-bottom: 1px solid black;"><tr><th style="text-align: left;">DESCRIPTION</th><th style="text-align: center;">RESULT</th>';

    if(parseInt(testCategory.test_cat_id) == 51 || parseInt(testCategory.test_cat_id) == 32 || parseInt(testCategory.test_cat_id) == 35 || parseInt(testCategory.test_cat_id) == 37 || parseInt(testCategory.test_cat_id) == 39 || parseInt(testCategory.test_cat_id) == 47 || parseInt(testCategory.test_cat_id) == 48 || parseInt(testCategory.test_cat_id) == 49 || parseInt(testCategory.test_cat_id) == 50 || parseInt(testCategory.test_cat_id) == 52){
        
    }else if(parseInt(testCategory.test_cat_id) == 33 || parseInt(testCategory.test_cat_id) == 36 || parseInt(testCategory.test_cat_id) == 40 || parseInt(testCategory.test_cat_id) == 46){
        htmlStr +='<th style="text-align: center;">UNITS</th>';
    }else{
        htmlStr +='<th style="text-align: center;">UNITS</th><th style="text-align: center;">FLAG</th><th>REFFERENCE VALUE</th>';
    }
    htmlStr+='</tr></thead><tbody>';
    for(var j=0; j<invTestResult.length; j++){
        if(invTestResult[j].cate_id == 33 && j == 0){
            htmlStr += '<tr><td colspan="4"><b><u>MACROSCOPIC EXAMINATION</u></b></td></tr>'
        }
        htmlStr += `<tr><td>${invTestResult[j].test_id != null ? invTestResult[j].test_name : testCategory.category_name}</td><td style="text-align: center;">${invTestResult[j].result}</td>`;
        if(parseInt(testCategory.test_cat_id) == 51 || parseInt(testCategory.test_cat_id) == 32 || parseInt(testCategory.test_cat_id) == 35 || parseInt(testCategory.test_cat_id) == 37 || parseInt(testCategory.test_cat_id) == 39 || parseInt(testCategory.test_cat_id) == 47 || parseInt(testCategory.test_cat_id) == 48 || parseInt(testCategory.test_cat_id) == 49 || parseInt(testCategory.test_cat_id) == 50 || parseInt(testCategory.test_cat_id) == 52){

        }else if(parseInt(testCategory.test_cat_id) == 33 || parseInt(testCategory.test_cat_id) == 36 || parseInt(testCategory.test_cat_id) == 40 || parseInt(testCategory.test_cat_id) == 46){
            htmlStr +=`<td style="text-align: center;">${invTestResult[j].test_id != null ? invTestResult[j].unit : ''}</td>`;
        }else{
            htmlStr +=`<td style="text-align: center;">${invTestResult[j].test_id != null ? invTestResult[j].unit : ''}</td><td style="text-align: center;">${invTestResult[j].test_id != null ? invTestResult[j].flag : ''}</td><td>${invTestResult[j].test_id != null ? invTestResult[j].reference : testCategory.reference}</td>`;
        }
        htmlStr += '</tr>';
        if(invTestResult[j].cat_id == 36 && j == 9){
            htmlStr += '<tr><td colspan="4"><b><u>CENTRIFUGED DEPOSIT</u></b></td></tr>'
        }
        if(invTestResult[j].cat_id == 33 && j == 1){
            htmlStr += '<tr><td colspan="4"><b><u>MICROSCOPIC EXAMINATION</u></b></td></tr>'
        }
    }
    htmlStr +='</tbody></table></div><!-- /.card-body --></div>';
    $('#accordion').append(htmlStr);
}

function validateForm(id=''){
    var status = true;
    if(id!=''){
        if(!$('#'+id).val()){
            $('#'+id).addClass('is-invalid');
            status = false;
        }else{
            $('#'+id).removeClass('is-invalid');
            $('#'+id).addClass('is-valid');
        }
    }else{
        if(!$('#sltMethod').val()){
            $('#sltMethod').addClass('is-invalid');
            status = false;
        }else{
            $('#sltMethod').removeClass('is-invalid');
            $('#sltMethod').addClass('is-valid');
        }
        if(!$('#inputAmount').val()){
            $('#inputAmount').addClass('is-invalid');
            status = false;
        }else{
            $('#inputAmount').removeClass('is-invalid');
            $('#inputAmount').addClass('is-valid');
        }
        if($('#sltMethod').val() == 2){
            if(!$('#inputCard').val()){
                $('#inputCard').addClass('is-invalid');
                status = false;
            }else{
                $('#inputCard').removeClass('is-invalid');
                $('#inputCard').addClass('is-valid');
            }
        }
    }
    return status;
}

function convertDate(num){
    if(num<10){
        return '0'+num;
    }else{
        return num;
    }
}

$(() => {
    getPatients();

    $('.overlay').hide();
});