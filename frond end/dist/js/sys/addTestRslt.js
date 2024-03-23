var url_string = location.href; //window.location.href
var url = new URL(url_string);
var invoiceId = url.searchParams.get("id");
invoiceData = [], testscategory = [], tests = [], invTestResult =[];
$(function(){
    getInvoiceData();
    getInvoiceTestData();
    $('#sltTestCategory').on('change', function(){
        $('.overlay').show();
        $('.btnAddTests').show();
        $('#testContent').empty();
        invTestResult =[]
        var invoiceTestId;
        setTimeout(function(){
            for(var i=0; i<testscategory.length; i++){
                if(testscategory[i].test_cat_id == $('#sltTestCategory').val()){
                    invoiceTestId = testscategory[i].id;
                    $('#txtAreaComments').val(testscategory[i].comment);
                    break;
                }
            }
            let data = adminData;
            data.invoiceTestId = invoiceTestId
            $.ajax({
                url:`${apiUrl}api/testResult/getInvoiceTest`,
                type: "POST",
                data: data,
                success: function(result){
                    console.log(result)
                    if(result.length>0){
                        invTestResult = result;
                        showTestRslt();
                        $('.btnAddTests').html('<i class="fas fa-pen"></i> Update');
                    }else{
                        getTests($('#sltTestCategory').val());
                    }
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
        }, 1000);
    });
    $('.btnAddTests').on('click', function(){
        $('.overlay').show();
        setTimeout(function(){
            if(invTestResult.length > 0){
                $.each(invTestResult,(k,v)=>{
                    let data = adminData;
                    data.result = $(`#${v.id}`).find('input').val();
                    data.flag = $(`#${v.id}`).find('.flag').html();
                    $.ajax({
                        url:`${apiUrl}api/testResult/update/${v.id}`,
                        type: "PUT",
                        data: data,
                        success: function(result){
                            console.log(result)
                            $('.overlay').hide();
                            
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
                })
//                 for(var i=0; i< invTestResult.length; i++){
//                     invTestResult[i].result = $('#'+invTestResult[i].id).find('input').val();
//                     invTestResult[i].flag = $('#'+invTestResult[i].id).find('.flag').html();
//                 }
//                 console.log(invTestResult);
//                 let data = {updateData:invTestResult};
//                 let result = requestAjax("updateTestResults", data);
//                 console.log(result); 
//                 if(result != false){    
//                     if(result.status == true){
//                         $('.overlay').hide();
// //                        $('.btnAddTests').hide();
//                         Swal.fire({
//                           icon: 'success',
//                           title: 'Success',
//                           text: result.msg
//                         });
//                     }
//                 }else{
//                     getTests($('#sltTestCategory').val());
//                 }
//                updateTest();
            }else{
                saveTests();
            }
        },1000);
    });
    $('.btnCheck').on('click', function(){
        $('.overlay').show();
        setTimeout(function(){setCompleted()},1000);
    });
    $(document).on('blur', '#txtAreaComments', function(){
        var invoiceTestId;
        var comments = $(this).val();
        if($('#sltTestCategory').val()){
            for(var i=0; i<testscategory.length; i++){
                if(testscategory[i].test_cat_id == $('#sltTestCategory').val()){
                    invoiceTestId = testscategory[i].id;
                    break;
                }
            }
            $('.overlay').show();
            setTimeout(function(){
                let data = adminData;
                data.comments = comments;
                $.ajax({
                    url:`${apiUrl}api/invoiceTest/setComments/${invoiceTestId}`,
                    type: "PUT",
                    data: data,
                    success: function(result){
                        console.log(result)
                        $('.overlay').hide();
                        
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
            }, 1000);
        }else{
            Swal.fire({
              icon: 'warning',
              title: 'Test not Found',
              text: 'Test not selected. First please select Test then add comments for tests. Hint: if you already type comments, first you copy the comments then you select test and paste it the comment box'
            });
        }
    })
    $(document).on('blur', 'input:text', function(){
        if($('#sltTestCategory').val()!=36 ){ //&& $('#sltTestCategory').val()!=41
            if(!isNaN($(this).val()) && $(this).val()){
                $(this).val(numberWithCommas(parseFloat($(this).val()).toFixed(2)));
            }
        }
    });
    $(document).on('input', 'input:text', function(){
        var id = $(this).parents('tr').attr('id');
        $(`#${id}`).find('.flag').html('')
        var ref = $('#'+id).find('.reference').html().split(' ');
        console.log(ref);
        
        switch(ref.length){
            case 1:
                break;
            case 2:
                if(ref[0] == '&lt;'){
                    if(parseFloat($(this).val().toString().replace(/,/g, '')) > parseFloat(ref[1]).toString().replace(/,/g, '')){
                        $(`#${id}`).find('.flag').html('H');
                    }
                }else if(ref[0] == '&gt;'){
                    if(parseFloat($(this).val().toString().replace(/,/g, '')) < parseFloat(ref[1]).toString().replace(/,/g, '')){
                        $(`#${id}`).find('.flag').html('L');
                    }
                }
                break;
            case 3:
//                console.log(parseFloat(ref[0].replace(/,/g, '')));
//                console.log(parseFloat($(this).val()));
                if(parseFloat($(this).val().toString().replace(/,/g, '')) < parseFloat(ref[0].toString().replace(/,/g, ''))){
                    $('#'+id).find('.flag').html('L');
                }else if(parseFloat($(this).val().toString().replace(/,/g, '')) > parseFloat(ref[2].toString().replace(/,/g, ''))){
                    $('#'+id).find('.flag').html('H');
                }
                break;
        }
    });
    $(document).on('focus', 'input:text', function(){
        var id = $(this).parents('tr').attr('id');
        var testName = $('#'+id).find('.testName').text();
//        console.log(testName);
        switch(testName){
            case 'Indirect':
                var total, direct;
//                console.log('indirect');
                $('#testContent tr').each(function(){
                    if($(this).find('.testName').text() == 'Total'){
                        total = parseFloat($(this).find('input').val());
                    }else if($(this).find('.testName').text() == 'Direct'){
                        direct = parseFloat($(this).find('input').val());
                    }
                });
                var inDirect = total - direct;
                $('#'+id).find('input').val(inDirect.toFixed(2));
                $('#'+id).find('input').trigger('input');
//                console.log(total+' '+direct);
                break;
            case 'Ratio':
                var tp, hdl;
                $('#testContent tr').each(function(){
                    if($(this).find('.testName').text() == 'Serum cholesterol - Total'){
                        tp = parseFloat($(this).find('input').val());
                    }else if($(this).find('.testName').text() == 'Cholesterol - H.D.L'){
                        hdl = parseFloat($(this).find('input').val());
                    }
                });
                var ratio = tp / hdl;
                $('#'+id).find('input').val(ratio.toFixed(2));
                $('#'+id).find('input').trigger('input');
//                console.log(total+' '+direct);
                break;
            case 'SERUM GLOBULIN':
                var tp, ab;
                $('#testContent tr').each(function(){
                    if($(this).find('.testName').text() == 'SERUM TOTAL PROTEIN'){
                        tp = parseFloat($(this).find('input').val());
                    }else if($(this).find('.testName').text() == 'SERUM ALBUMIN'){
                        ab = parseFloat($(this).find('input').val());
                    }
                });
                var glo = tp - ab;
                $('#'+id).find('input').val(glo.toFixed(2));
                $('#'+id).find('input').trigger('input');
//                console.log(total+' '+direct);
                break;
            case 'A/G RATIO':
                var ab, glo;
                $('#testContent tr').each(function(){
                    if($(this).find('.testName').text() == 'SERUM ALBUMIN'){
                        ab = parseFloat($(this).find('input').val());
                    }else if($(this).find('.testName').text() == 'SERUM GLOBULIN'){
                        glo = parseFloat($(this).find('input').val());
                    }
                });
                var ag = ab / glo;
                $('#'+id).find('input').val(ag.toFixed(2));
                $('#'+id).find('input').trigger('input');
//                console.log(total+' '+direct);
                break;
            case 'Globulin':
                var tp, ab;
                $('#testContent tr').each(function(){
                    if($(this).find('.testName').text() == 'Total Protein'){
                        tp = parseFloat($(this).find('input').val());
                    }else if($(this).find('.testName').text() == 'SERUM GLOBULIN'){
                        ab = parseFloat($(this).find('input').val());
                    }
                });
                var glo = tp - ab;
                $('#'+id).find('input').val(glo.toFixed(2));
                $('#'+id).find('input').trigger('input');
//                console.log(total+' '+direct);
                break;
            case 'CHOLESTEROL LDL':
                var tc, hdl, tri;
                $('#testContent tr').each(function(){
                    if($(this).find('.testName').text() == 'CHOLESTEROL TOTAL'){
                        tc = parseFloat($(this).find('input').val());
                    }else if($(this).find('.testName').text() == 'CHOLESTEROL HDL'){
                        hdl = parseFloat($(this).find('input').val());
                    }else if($(this).find('.testName').text() == 'TRIGLYCERIDES'){
                        tri = parseFloat($(this).find('input').val());
                    }
                });
                var ldl = tc - hdl - (tri/5);
                $('#'+id).find('input').val(ldl.toFixed(2));
                $('#'+id).find('input').trigger('input');
//                console.log(total+' '+direct);
                break;
            case 'CHOLESTEROL  VLDL':
                var tri;
                $('#testContent tr').each(function(){
                    if($(this).find('.testName').text() == 'TRIGLYCERIDES'){
                        tri = parseFloat($(this).find('input').val());
                    }
                });
                var vldl = tri/5;
                $('#'+id).find('input').val(vldl.toFixed(2));
                $('#'+id).find('input').trigger('input');
                break;
            case 'CHOLESTEROL / HDL RATIO':
                var hdl, tc;
                $('#testContent tr').each(function(){
                    if($(this).find('.testName').text() == 'CHOLESTEROL TOTAL'){
                        tc = parseFloat($(this).find('input').val());
                    }else if($(this).find('.testName').text() == 'CHOLESTEROL HDL'){
                        hdl = parseFloat($(this).find('input').val());
                    }
                });
                var ratio = tc/hdl;
                $('#'+id).find('input').val(ratio.toFixed(2));
                $('#'+id).find('input').trigger('input');
//                console.log(total+' '+direct);
                break;
        }
    });
    $('.overlay').hide();
});

function getInvoiceData(){
    let data = adminData;
    $.ajax({
        url:`${apiUrl}api/invoice/${invoiceId}`,
        type: "POST",
        data: data,
        success: function(result){
            console.log(result)
            invoiceData = result;
            showInvoice();
            
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

function showInvoice(){
    if(invoiceData.length>0){
        $('#patientId').html('Pt-'+invoiceData[0].patient_id);
        $('#patientName').html(`${invoiceData[0].p_first_name} ${invoiceData[0].p_last_name}`);
        $('#patientAge').html(invoiceData[0].age);
        $('#patientGender').html(invoiceData[0].gender=='M'?'MALE':'FEMALE');
        $('#doctorName').html(`${invoiceData[0].d_first_name} ${invoiceData[0].d_last_name}(${invoiceData[0].specialist})`);
        $('#invoice').html(invoiceData[0].invoice_no);
        $('#invDate').html(invoiceData[0].date);
        $('#user').html(`${invoiceData[0].u_first_name} ${invoiceData[0].u_last_name}`);
    }
}

function getInvoiceTestData(){
    let data = adminData;
    data.invoiceId = invoiceId;
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
    let htmlStr = '<option value="">Select Tests</option>';
    if(testscategory.length>0){
        for(var i=0; i<testscategory.length; i++){
            htmlStr += '<option value="'+testscategory[i].test_cat_id+'" >'+testscategory[i].category_name+'</option>';
        }

        $('#sltTestCategory').html(htmlStr);
        $('#sltTestCategory').select2({
            theme: 'bootstrap4',
        });
    }
}

function getTests(id){

    let data = adminData;
    data.cat_id = id;
    $.ajax({
        url:`${apiUrl}api/tests`,
        type: "POST",
        data: data,
        success: function(result){
            console.log(result)
            if(result.length>0){    
        
                tests = result;
                showTests();
            }else{
                for(var i=0; i<testscategory.length; i++){
                    if(testscategory[i].test_cat_id == id){
                        var $tr = $('<tr />',{
                            id:testscategory[i].test_cat_id
                        });
                        $tr.append('<td>'+testscategory[i].category_name+'</td>');
                        $tr.append('<td><input type="text" class="form-control" id="inputResult" placeholder="Result"></td>');
                        $tr.append('<td></td>');
                        $tr.append('<td></td>');
                        $tr.append('<td>'+testscategory[i].reference+'</td>');
        //                $tr.append('<td>'+testscategory[i].comment+'</td>');
                        $('#testContent').append($tr);
                        break;
                    }
                }
            }
            
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

//     let result = requestAjax("tests/getTestbyCategory", data);
// //    console.log(result); 
//     if(result){    
        
//         tests = result;
//         showTests();
//     }else{
//         for(var i=0; i<testscategory.length; i++){
//             if(testscategory[i].test_cate_id == id){
//                 var $tr = $('<tr />',{
//                     id:testscategory[i].test_cate_id
//                 });
//                 $tr.append('<td>'+testscategory[i].category_name+'</td>');
//                 $tr.append('<td><input type="text" class="form-control" id="inputResult" placeholder="Result"></td>');
//                 $tr.append('<td></td>');
//                 $tr.append('<td></td>');
//                 $tr.append('<td>'+testscategory[i].reference+'</td>');
// //                $tr.append('<td>'+testscategory[i].comment+'</td>');
//                 $('#testContent').append($tr);
//                 break;
//             }
//         }
//     }
    $('.overlay').hide();
}

function showTests(){
    if(tests.length>0){
        for(var i=0; i<tests.length; i++){
            var $tr = $('<tr />',{
                id:tests[i].id
            });
            $tr.append(`<td class="testName">${tests[i].test_name}</td>`);
            $td = $('<td />');
            if(tests[i].id == 111 || tests[i].id == 93 || tests[i].id == 123 || tests[i].id == 127 || tests[i].id == 124 || tests[i].id == 37 || tests[i].id == 18 || tests[i].id == 19){
                $td.append('<select class="form-control"><option value="POSITIVE">POSITIVE</option><option value="NEGATIVE">NEGATIVE</option></select>');
            }else{
                $td.append('<input type="text" class="form-control" placeholder="Result">');
            };
            $tr.append($td);
            $tr.append(`<td>${tests[i].unit}</td>`);
            $tr.append(`<td class="flag" style="text-align:center;">${tests[i].flag}</td>`);
            $tr.append(`<td class="reference">${tests[i].reference}</td>`);
//            $tr.append('<td></td>');
            $('#testContent').append($tr);
        }
    }
}

function saveTests(){
    var invoiceTestId;
    for(var i=0; i<testscategory.length; i++){
        if(testscategory[i].test_cat_id == $('#sltTestCategory').val()){
            invoiceTestId = testscategory[i].id;
            break;
        }
    }
    $('#testContent tr').each(function(){
        let ele = adminData;
        ele.invoice_test_id = invoiceTestId;
        ele.test_id = tests.length > 0? $(this).attr('id'):null;
        ele.result = $(this).find('input').val()?$(this).find('input').val():$(this).find('select').val();
        ele.flag = $(this).find('.flag').html()? $(this).find('.flag').html():'';
        console.log(ele);
        $.ajax({
            url:`${apiUrl}api/testResults/create`,
            type: "POST",
            data: ele,
            success: function(result){
                console.log(result)
                
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

    });
        
    $('.overlay').hide();
    $('.btnAddTests').hide();
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Results Successfully Added.'
    });
    
}

function showTestRslt(){
    if(invTestResult.length>0){
        for(var i=0; i<invTestResult.length; i++){
            var $tr = $('<tr />',{
                id:invTestResult[i].id
            });
            $tr.append('<td class="testName">'+invTestResult[i].test_name+'</td>');
            $tr.append('<td><input type="text" class="form-control" placeholder="Result" value="'+invTestResult[i].result+'"></td>');
            $tr.append('<td>'+invTestResult[i].unit+'</td>');
            $tr.append('<td class="flag">'+invTestResult[i].flag+'</td>');
            $tr.append('<td class="reference">'+invTestResult[i].reference+'</td>');
//            $tr.append('<td></td>');
            $('#testContent').append($tr);
        }
    }
    $('.overlay').hide();
}

function setCompleted(){
    let data = {id:invoiceId, status:1};
    $.ajax({
        url:`${apiUrl}api/invoice/setCompleted/${invoiceId}`,
        type: "PUT",
        data: data,
        success: function(result){
            console.log(result)
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "Results Successfully completed."
            });
            window.history.back();
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