var patientData = [], doctorsData = [];
var categoryData = [];
var invoices = [];
var centerData = [];
var sales = {}; var salesProducts = [];
$('.btnNewPatient, .btnNewDoctor, .btnNewCenter').hide();
$(function(){
    invoices = JSON.parse(localStorage.getItem('labBills'))?JSON.parse(localStorage.getItem('labBills')):[];
    if(invoices.length > 0){
        var billDate = new Date(invoices[0].invDate);
        var today = new Date();
        billDate = billDate.getFullYear()+'-'+(billDate.getMonth()+1)+'-'+billDate.getDate();
        today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // console.log(billDate+' '+today);
        if(new Date(billDate) < new Date(today)){
            localStorage.removeItem('labBills');
            invoice = [];
        }
    }
    getPatients();
    getDoctors();
    getCentersData();
    getTests();
    setDateInvoice();
    setTotal();
    $('#btnNewPatient').on('click',function(){
        newPatients();
    });
    $('#btnNewDoctor').on('click',function(){
        newDoctor();
    });
    $('#btnNewCenter').on('click',function(){
        newCenter();
    });
    $('#patient').on('change',function(){
        sales.patientId = $(this).select2('data')[0].id;
        for(var i=0; i<patientData.length; i++){
            if(patientData[i].id == sales.patientId){
                sales.patId = 'PT-'+patientData[i].id;
                sales.patientName = `${patientData[i].first_name} ${patientData[i].last_name}`;
                sales.patientAge = patientData[i].age;
                sales.patientGender = patientData[i].gender == 'M'?'Male':'Female';
            }
        }
        // console.log(sales);
    });
    $('#doctor').on('change',function(){
        sales.doctorId = $(this).select2('data')[0].id;
        for(var i=0; i<doctorsData.length; i++){
            if(doctorsData[i].id == sales.doctorId){
                sales.dactorName = `Dr. ${doctorsData[i].first_name} ${doctorsData[i].last_name}`
            }
        }
        // console.log(sales);
    });
    $('#center').on('change',function(){
        sales.centerId = $(this).select2('data')[0].id;
        for(var i=0; i<centerData.length; i++){
            if(centerData[i].id == sales.centerId){
                sales.cenId = centerData[i].id;
                sales.centerCode = centerData[i].code;
                sales.centerName = centerData[i].name;
                sales.centerDiscount = centerData[i].discount;
                setTotal();
                break;
            }
        }
        // console.log(sales);
    });
//    click date change button
    $('.btnChangeDate').on('click',function(){
        let htmlStr = '<input type="text" class="form-control datetimepicker-input" id="inputDate" data-toggle="datetimepicker" data-target="#inputDate" placeholder="Enter Date Time" autocomplete="off">';
        $('#invDate').html(htmlStr);
        $('#inputDate').datetimepicker({
            format: 'YYYY-MM-DD H:m:s'
        });
        $('#inputDate').on('blur', function(){
                setDateInvoice($('#inputDate').val());
        });
    });
    $('#sltTests').on('change', function(){
        if($(this).val() != ''){
            addProduct();
        }
    });
//    $('.btnAddProduct').on('click', function(){
//        addProduct();
//    });
    $('#discount').on('click', function(){
        $('.btnDiscount').trigger('click');
    })
    $('.btnDiscount').on('click', function(){
        var $discount = $('<input />', {
            id : 'inputDiscount',
            class : 'form-control',
            type : 'number',
            step : 'any',
            value : 0
        });
        $('#discount').html($discount);
        $('#inputDiscount').focus();
        $('#inputDiscount').select();
        $('#inputDiscount').on('keyup', function(e){
            if(e.which == 13){
                sales.discount = $(this).val();
                setTotal();
            }
        });
        $('#inputDiscount').on('blur', function(){
            sales.discount = $(this).val();
            setTotal();
        });
    });
    $('.btnNew').on('click', function(){
        if(sales.patientId){
            $('#chkPrintBill').prop('checked', false);
            saveBill();
            $('#chkPrintBill').prop('checked', true);
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Patient not selected or added',
                text: 'Patient is not selected or added. Please verify this bill have patient or choose patient in patient tab.'
            });
        }
    });
    $('.btnPrint').on('click', function(){
        printBill();
    });
    $('.btnCash').on('click', function(){
        if(sales.patientId){
            showCash();
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Could not be completed',
                text: 'Patient, Doctor or Center is/are not selected or added. Please verify this bill have patient, doctor & center or choose them in their tab(s).'
            });
        }
    });
    $('.btnCredit').on('click', function(){
        if(sales.patientId){
            sales.paymentMethod = 'Credit';
            saveBill();
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Patient not selected or added',
                text: 'Patient is not selected or added. Please verify this bill have patient or choose patient in patient tab.'
            });
        }
        
    });
    
    $('.btnCancel').on('click', function(){
        resetBill();
    });
    $(document).on('keyup', function(e){
        // console.log(e.which);
        switch(e.which){
            case 107:
                $('#sltTests').select2('open');
                break;
            case 37:
                $('.btnCash').trigger('click');
                break;
        }
    });
    $('.overlay').hide();
});
//Set Date
function setDateInvoice(inputDate=''){
    var date, invoice;
    // console.log(inputDate);
    if(inputDate === ''){
        date = new Date();
    }else{
        date = new Date(inputDate.toString());
    }
    invoice = `${date.getFullYear()}${addZero(date.getMonth() + 1)}${addZero(date.getDate())}-${adminSession.id}-${invoices.length + 1}`;
    date = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`; 
    $('#invoice').html(invoice);
    $('#invDate').html(date);
    $('#user').html(adminSession.name);
    sales.invoice = invoice;
    sales.invDate = date;
    sales.userId = adminSession.id;
    sales.payment = 0;
}

//Get Patients
function getPatients(){
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/patients`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            patientData = result;
            $('#patient').empty().append('<option value="">Select Patient</option>');
            if(patientData.length>0){
                $.each(patientData, (k,v)=>{
                    $('#patient').append(`<option value="${v.id}" > ${v.first_name} ${v.last_name} | ${v.phone_no} | Age: ${v.age}</option>`);
                });
                $('#patient').select2({
                    theme: 'bootstrap4'
                });
            }
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
//New pactients
function newPatients(){
    $('#modal-default').find('.overlay').show();
    $('#modal-default').modal('show');
    let htmlStr = '';
    htmlStr += '<div class="card card-primary"><!-- /.card-header --><!-- form start --><form role="form"><div class="card-body">';
    htmlStr +='<div class="form-group"><label for="name">Name</label><input type="text" class="form-control" id="inputName" placeholder="Enter Name"></div>';
    htmlStr +='<div class="form-group"><label for="phone">Phone no</label><input type="text" class="form-control" id="inputPhoneNo" data-inputmask="&quot;mask&quot;: &quot;(099)999-9999&quot;" data-mask="" required placeholder="Enter Phone no"></div>';
    htmlStr +='<div class="form-group"><label for="address">Address</label><input type="text" class="form-control" id="inputAddress" placeholder="Address"></div>';
    htmlStr +='<div class="form-group"><label for="sltGender">Gender</label><select class="form-control custom-select" id="sltGender" data-placeholder="Select Gender" style="width: 100%;"><option value="M">Male</option><option value="F">Female</option></select></div>';
    htmlStr +='<div class="form-group"><label for="age">Age</label><input type="text" class="form-control" id="inputAge" placeholder="Age"></div>';
    htmlStr +='</div><!-- /.card-body --></form></div><!-- /.card -->';
    $('#modal-body').html(htmlStr);
    $('.modal-title').html('New Patient');
    $('#inputPhoneNo').inputmask();
    $('#modal-default').find('.overlay').removeClass('d-flex').hide();
    $('#btnModalSave').unbind().click( function(){
        var data = {};
        var validate = validatepatientForm();
        // console.log(validate);
        if(validate != false){
            data.name = $('#inputName').val(); 
            data.phoneno = $('#inputPhoneNo').val();
            data.address = $('#inputAddress').val();
            data.gender = $('#sltGender').val();
            data.age = $('#inputAge').val();
            let result = requestAjax("patient/addPatient", data);
            // console.log(result); 
            if(result != false){    
                if(result.status == true){
                    $('#modal-default').modal('hide');
                    Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: result.insertData.msg
                    });
                    getPatients();
                    $('#patient').val(result.insertData.inserted_id).trigger('change');
                }
            }
        }
    });
    $('input').on('change', function(){
       // console.log(this.id);
        validatepatientForm(this.id);
    });
}
//Validate Customer
function validatepatientForm(id=''){
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
        if(!$('#inputName').val()){
            $('#inputName').addClass('is-invalid');
            status = false;
        }else{
            $('#inputName').removeClass('is-invalid');
            $('#inputName').addClass('is-valid');
        }
//        if(!$('#inputPhoneNo').val()){
//            $('#inputPhoneNo').addClass('is-invalid');
//            status = false;
//        }else{
//            var phoneNo = $('#inputPhoneNo').val();
//            phoneNo = phoneNo.replace(/[^0-9]/g, '')
//            if(phoneNo.length != 10){
//                $('#inputPhoneNo').addClass('is-invalid');
//                status = false;
//            }else{
//                $('#inputPhoneNo').removeClass('is-invalid');
//                $('#inputPhoneNo').addClass('is-valid');
//            }
//        }
//        if(!$('#inputAddress').val()){
//            $('#inputAddress').addClass('is-invalid');
//            status = false;
//        }else{
//            $('#inputAddress').removeClass('is-invalid');
//            $('#inputAddress').addClass('is-valid');
//        }
        if(!$('#sltGender').val()){
            $('#sltGender').addClass('is-invalid');
            status = false;
        }else{
            $('#sltGender').removeClass('is-invalid');
            $('#sltGender').addClass('is-valid');
        }
        if(!$('#inputAge').val()){
            $('#inputAge').addClass('is-invalid');
            status = false;
        }else{
            $('#inputAge').removeClass('is-invalid');
            $('#inputAge').addClass('is-valid');
        }
        
    }
    return status;
}
//Get Doctors
function getDoctors(){
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/doctors`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            doctorsData = result;
            $('#doctor').empty().append('<option value="">Select Doctor</option>');
            if(doctorsData.length>0){
                $.each(doctorsData, (k,v)=>{
                    $('#doctor').append(`<option value="${v.id}" > ${v.first_name} ${v.last_name} | ${v.phone_no} | ${v.specialist}</option>`);
                });
                $('#doctor').select2({
                    theme: 'bootstrap4'
                });
            }
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

//New pactients
function newDoctor(){
    $('#modal-default').find('.overlay').show();
    $('#modal-default').modal('show');
    let htmlStr = '';
    htmlStr += '<div class="card card-primary"><!-- /.card-header --><!-- form start --><form role="form"><div class="card-body">';
    htmlStr +='<div class="form-group"><label for="name">Dr. / Hospital Name</label><input type="text" class="form-control" id="inputName" placeholder="Enter Name"></div>';
    htmlStr +='<div class="form-group"><label for="inputSpecialist">Specialist</label><input type="text" class="form-control" id="inputSpecialist" placeholder="Enter Specialist"></div>';
    htmlStr +='<div class="form-group"><label for="phone">Phone no</label><input type="text" class="form-control" id="inputPhoneNo" data-inputmask="&quot;mask&quot;: &quot;(099)999-9999&quot;" data-mask="" required placeholder="Enter Phone no"></div>';
    htmlStr +='</div><!-- /.card-body --></form></div><!-- /.card -->';
    $('#modal-body').html(htmlStr);
    $('.modal-title').html('New Doctor');
    $('#inputPhoneNo').inputmask();
    $('#modal-default').find('.overlay').removeClass('d-flex').hide();
    $('#btnModalSave').unbind().click( function(){
        var data = {};
        var validate = validateDoctorForm();
        // console.log(validate);
        if(validate != false){
            data.name = $('#inputName').val();
            data.specialist = $('#inputSpecialist').val();
            data.phoneno = $('#inputPhoneNo').val();
            let result = requestAjax("addDoctor", data);
            // console.log(result); 
            if(result != false){    
                if(result.status == true){
                    $('#modal-default').modal('hide');
                    Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: result.insertData.msg
                    });
                    getDoctors();
                    $('#sltDoctor').val(result.insertData.inserted_id).trigger('change');
                }
            }
        }
    });
    $('input').on('change', function(){
//        console.log(this.id);
        validateDoctorForm(this.id);
    });
}
//Validate Customer
function validateDoctorForm(id=''){
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
        if(!$('#inputName').val()){
            $('#inputName').addClass('is-invalid');
            status = false;
        }else{
            $('#inputName').removeClass('is-invalid');
            $('#inputName').addClass('is-valid');
        }
//        if(!$('#inputSpecialist').val()){
//            $('#inputSpecialist').addClass('is-invalid');
//            status = false;
//        }else{
//            $('#inputSpecialist').removeClass('is-invalid');
//            $('#inputSpecialist').addClass('is-valid');
//        }
//        if(!$('#inputPhoneNo').val()){
//            $('#inputPhoneNo').addClass('is-invalid');
//            status = false;
//        }else{
//            var phoneNo = $('#inputPhoneNo').val();
//            phoneNo = phoneNo.replace(/[^0-9]/g, '')
//            if(phoneNo.length != 10){
//                $('#inputPhoneNo').addClass('is-invalid');
//                status = false;
//            }else{
//                $('#inputPhoneNo').removeClass('is-invalid');
//                $('#inputPhoneNo').addClass('is-valid');
//            }
//        }
    }
    return status;
}

//getCentersData
function getCentersData(){
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/centers`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            centerData = result;
            $('#center').empty().append('<option value="">Select Center</option>');
            if(centerData.length>0){
                $.each(centerData, (k,v)=>{
                    $('#center').append(`<option value="${v.id}" > ${v.code}| ${v.name} </option>`);
                });
                $('#center').select2({
                    theme: 'bootstrap4'
                });
            }
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

//New centers
function newCenter(){
    $('#modal-default').find('.overlay').show();
    $('#modal-default').modal('show');
    let htmlStr = '';
     htmlStr += '<div class="card card-primary"><!-- /.card-header --><!-- form start --><form role="form"><div class="card-body">';
    htmlStr +='<div class="form-group"><label for="code">Code</label><input type="text" class="form-control" id="inputCode" placeholder="Enter Code"></div>';
    htmlStr +='<div class="form-group"><label for="name">Center Name</label><input type="text" class="form-control" id="inputName" placeholder=" Name"></div>'; 
    htmlStr +='<div class="form-group"><label for="discount">Discount</label><input type="text" class="form-control" id="inputDiscount" placeholder="Discount"></div>'; htmlStr +='</div>';
    htmlStr +='<!-- /.card-body --></form></div><!-- /.card -->';
    $('#modal-body').html(htmlStr);
    $('.modal-title').html('New Center');
    $('#modal-default').find('.overlay').removeClass('d-flex').hide();
    $('#btnModalSave').unbind().click( function(){
        var data = {};
        var validate = validatecenterForm();
        // console.log(validate);
        if(validate != false){
            data.code = $('#inputCode').val(); 
            data.name = $('#inputName').val();
            data.discount = $('#inputDiscount').val();;
            let result = requestAjax("center/addCenter", data);
            // console.log(result); 
            if(result != false){    
                if(result.status == true){
                    $('#modal-default').modal('hide');
                    Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: result.insertData.msg
                    });
                    getCentersData();
                    $('#sltCenter').val(result.insertData.inserted_id).trigger('change');
                }
            }
        }
    });
     $('input').on('change', function(){
//        console.log(this.id);
        validatecenterForm(this.id);
    });
}
function validatecenterForm(id=''){
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
        if(!$('#inputCode').val()){
            $('#inputCode').addClass('is-invalid');
            status = false;
        }else{
            $('#inputCode').removeClass('is-invalid');
            $('#inputCode').addClass('is-valid');
        }
        if(!$('#inputName').val()){
            $('#inputName').addClass('is-invalid');
            status = false;
        }else{
            $('#inputName').removeClass('is-invalid');
            $('#inputName').addClass('is-valid');
        }
        if(!$('#inputDiscount').val()){
            $('#inputDiscount').addClass('is-invalid');
            status = false;
        }else{
            $('#inputDiscount').removeClass('is-invalid');
            $('#inputDiscount').addClass('is-valid');
        }    
    }
    return status;
}

//Get Products
function getTests(){
    let data = adminData;
    $.ajax({
        url: `${apiUrl}api/testCategories`,
        type: "POST",
        dataType: "json",
        data: data,
        success: function(result){
            console.log(result);
            categoryData = result;
            $('#sltTests').empty().append('<option value="">Select Tests</option>');
            if(categoryData.length>0){
                $.each(categoryData, (k,v)=>{
                    $('#sltTests').append(`<option value="${v.id}" > ${v.category_name}| ${v.amount} </option>`);
                });
                $('#sltTests').select2({
                    theme: 'bootstrap4'
                });
            }
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

//Add products
function addProduct(){
    let data = {};
    data.testId = $('#sltTests').val();
    for(var i=0; i<categoryData.length; i++){
        if(categoryData[i].id == $('#sltTests').val()){
            data.category_name = categoryData[i].category_name;
            data.specimen = $('#sltSpecimen').val();
            data.price = categoryData[i].amount;
        }
    }
    salesProducts.push(data);
    // console.log(salesProducts);
    resetProductPanel();
    setTotal();
}
// Reset Product Panel
function resetProductPanel(){
    $('#sltTests').val('').trigger('change').select2('focus');
}
//set Total
function setTotal(){
    $('#tableContent').empty();
    var crossTotal = 0, netTotal = 0;
    
    if(salesProducts.length > 0){
        for(var i=0; i<salesProducts.length; i++){
           var supTotal = parseFloat(salesProducts[i].price);
           crossTotal += supTotal;
           var $tr = $('<tr />',{id:i});
            $tr.append('<td style="text-align: center;"><a href="javascript:void(0)" class="btnDeleteProduct"><i class="fas fa-times text-red"></i></a></td>');
            $tr.append('<td>'+salesProducts[i].category_name+' | Specimen:'+(salesProducts[i].specimen==1?'Blood':'Urine')+'</td>');
            $tr.append('<td style="width: 12%; text-align: right;">'+salesProducts[i].price+'</td>');
            $tr.append('<td style="width: 15%; text-align: right;">'+supTotal.toFixed(2)+'</td>');
            $('#tableContent').append($tr);
        }
    }
    var discount = (sales.discount?(crossTotal*parseFloat(sales.discount)/100):(sales.centerDiscount?(crossTotal*sales.centerDiscount)/100:0));
    netTotal = crossTotal - discount;
    $('#supTotal').html(crossTotal.toFixed(2));
    $('#thDis').html((sales.discount?'':(sales.centerDiscount?'('+sales.centerDiscount+' %)':'')));
    $('#discount').html(discount.toFixed(2));
    $('#netTotal').html(netTotal.toFixed(2));
    $('.btnDeleteProduct').on('click', function(){
        var id = $(this).parent().parent('tr').attr('id');
        // console.log(id);
        salesProducts.splice(id, 1);
        setTotal();
    });
}

function saveBill(){
    if(salesProducts.length>0){
        console.log(sales);
        let data = {...sales, ...adminData};
        $.ajax({
            url: `${apiUrl}api/invoice/create`,
            type: "POST",
            dataType: "json",
            data: data,
            success: function(result){
                console.log(result);
                var saveProSts = saveProducts(result.id);
                if(saveProSts){
                    sales.invoiceId = result.id
                    if($('#chkPrintBill').is(':checked')){
                        printBill();
                    }
                    invoices.push(sales);
                    localStorage.setItem('labBills', JSON.stringify(invoices));
                    resetBill();
                    toastr.success("Successfully Created.");
                }
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
    }else{
        Swal.fire({
            icon: 'warning',
            title: 'Tests not selected or added',
            text: 'Test is not selected or added. Please verify this bill have Tests or choose Test in Test tab. if you do not save this bill, you may choose cancel.'
        });
    }
    $('.overlay').hide();
}

function saveProducts(invoiceId){
    var status = true;
    $.each(salesProducts, (k,v)=>{
        v.invoiceId = invoiceId;
        let saleProData = {...v, ...adminData};
        $.ajax({
            url: `${apiUrl}api/invoiceTest/create`,
            type: "POST",
            dataType: "json",
            data: saleProData,
            success: function(result){
                console.log(result);
                status = result;
            },
            fail: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
            },
            error: function (xhr, textStatus) {
                console.log(xhr);
            }
        });
    });
    return status;
}
//reset Bill
function resetBill(){
    $('#patient').val('').trigger('change');
    $('#doctor').val('').trigger('change');
    $('#center').val('').trigger('change');
    sales = {};
    salesProducts = [];
    setTotal();
    setDateInvoice();
}
//Print bill
function printBill(){
    var crossTotal = 0, discount = parseFloat($('#discount').text()), netTotal = 0;
    var printContents = '<html><head>';
//    printContents += $('head').html();
    printContents += '</head><body><h4 style="text-align:center;">LAS</h4>';
    printContents += '<p style="text-align:center;margin-top: 10px;margin-bottom: 5px;">No 123, Jaffna Road, Jaffna.</p>';
    printContents += '<p style="text-align:center;margin-top: 2px;">077 777 7777</p>';
    printContents += '<p style="text-align:center;margin-top: 10px;"><b>INVOICE</b></p>';
    printContents += `<div class="row">
        <div class="col-md-4">
            <table style="width: 100%; ">
                <tr>
                    <th style="text-align: left;">Patient ID:</th>
                    <td style="text-align: right;">Pt-${sales.patientId}</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Name:</th>
                    <td style="text-align: right;">${sales.patientName}</td>
                </tr>`;
    printContents += `<tr>
                    <th style="text-align: left;">Age:</th>
                    <td style="text-align: right;">${sales.patientAge} yrs</td>
                    </tr>
                <tr>
                    <th style="text-align: left;">Gender:</th>
                    <td style="text-align: right;">${sales.patientGender}</td>
                </tr>
            </table>
        </div>`;
//    printContents += '<div class="col-md-4"></div>'
    printContents += `<div class="col-md-4">
        <table style="width: 100%; ">
            <tr>
                <th style="text-align: left;">invoice:</th>
                <td style="text-align: right;">${sales.invoice}</td>
            </tr>
            <tr>    
                <th style="text-align: left;">Date:</th>
                <td style="text-align: right;">${sales.invDate}</td>
            </tr>`;
    printContents += `<tr>
                <th style="text-align: left;">casier:</th>
                <td style="text-align: right;">${adminSession.name}</td>
            </tr>
        </table></div></div>`;
    printContents += '<br>';
   
    printContents += '<div class="col-lg-12"><table style="width: 100%;" class="table-sm table-bordered"><thead><tr style="border: 1px;"><th style="width:5%;text-align: center;">#</th><th style="text-align: left;">Test(s)</th><th style="width:15%; text-align: right;">Price</th></tr></thead><tbody class="table-borderless">';
    if(salesProducts.length >= 0){
        var no = 0;
        $.each(salesProducts, (k,v)=>{
            no++;
            var supTotal = parseFloat(v.price);
            crossTotal += supTotal;
            printContents += `<tr><td style="text-align:center;">${no}</td><td style="text-align:left;">${v.category_name}</td><td style="text-align:right;">${supTotal.toFixed(2)}</td></tr>`;
        });
    }
    netTotal = crossTotal - discount;
    printContents += `</tbody><tfoot class="table-borderless"><tr><th style="text-align:right;" colspan="2">Total</th><th style="text-align:right;">${crossTotal.toFixed(2)}</th></tr>`;
        printContents += `<tr><th style="text-align:right;" colspan="2">Discount <span>${$('#thDis').text()}</span></th><th style="text-align:right;">${parseFloat(discount).toFixed(2)}</th></tr>`;
    printContents +=`<tr><th style="text-align:right;" colspan="2">BillTolal</th><th style="text-align:right;">${netTotal.toFixed(2)}</th></tr>`;
    printContents +=`<tr><th style="text-align:right;" colspan="2">Paying amount(${sales.paymentMethod})</th><th style="text-align:right;">Rs ${parseFloat(sales.payment).toFixed(2)}</th></tr><tr><th style="text-align:right;" colspan="2">Balance</th><th style="text-align:right;">Rs ${(parseFloat(sales.payment) - netTotal).toFixed(2)}</th></tr></tfoot></table></div><div class="col-lg-12">`;
    printContents += '<p style="text-align: center;margin-top: 10px;"><b>Thank You. Get our services at reasonable price.</b></p>';
    printContents += '<p style="text-align:center;"><small></small></p>';
    printContents += '</div></body></html>';

    var popupWin = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
    popupWin.document.open();
    popupWin.document.write(printContents);
    popupWin.document.close();
    popupWin.focus();
    popupWin.onafterprint = function(){popupWin.close()};
    popupWin.onload = function() { 
        popupWin.print(); 
    }
}
//Cash Payment
function showCash(){
    $('#modal-default').find('.overlay').show();
    $('#modal-default').modal('show');
    let htmlStr = '';
    htmlStr += '<div class=""><!-- /.card-header --><div class="card-body">';
    htmlStr +='<div class="form-group"><label for="name">Cash</label><input type="number" class="form-control" id="inputCash" placeholder="Enter Amount" step="any"></div>';
    htmlStr +='</div><!-- /.card-body --></div><!-- /.card -->';
    $('#modal-body').html(htmlStr);
    $('.modal-title').html('Cash Payment');
    $('#modal-default').find('.overlay').removeClass('d-flex').hide();
    $('#modal-default').on('shown.bs.modal', function() {
        $('#inputCash').focus();
    });
    $('#inputCash').on('focus', function(){
        $(this).unbind();
        $(this).on('keyup', function(e){
            if(e.which == 13){
                $('#btnModalSave').trigger('click');
            }
        });
    })
    $('#btnModalSave').unbind().click( function(){
        var data = {};
        var validate = validateCashForm();
//        console.log(validate);
        if(validate != false){
            
            sales.payment = $('#inputCash').val();
            sales.paymentMethod = 'Cash';
            if(sales.payment >= parseFloat($('#netTotal').html())){
                $('#modal-default').modal('hide');
                saveBill();
            }else{
                $('#modal-default').modal('hide');
                Swal.fire({
                  icon: 'warning',
                  title: 'Payment not completed..!',
                  text: 'Payment is not fully completed. Please verify this bill have full payment or choose another way for complete payment.'
                });
            }
        }
    });
    $('input').on('change', function(){
//        console.log(this.id);
        validateCashForm(this.id);
    });
}
//Validate Cash
function validateCashForm(id=''){
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
        if(!$('#inputCash').val()){
            $('#inputCash').addClass('is-invalid');
            status = false;
        }else{
            $('#inputCash').removeClass('is-invalid');
            $('#inputCash').addClass('is-valid');
        }
    }
    return status;
}