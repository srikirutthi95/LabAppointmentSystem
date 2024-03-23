$(function(){
    getCountInvoices();
    todayPayment();
    last30Payment();
    getTotalCenter()
 });
 

function getCountInvoices(){
    let data = adminData;
    var date = new Date();
    date = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`; 
    data.invDate = date;
    $.ajax({
        url:`${apiUrl}api/getCountInvoices`,
        type: "POST",
        data: data,
        success: function(result){
            console.log(result);

            //total
            $('#totalReport').find('.info-box-number').html(result[0]);
            var totalPercentage = (result[0]/result[0])*100;
            $('#totalReport').find('.progress-bar').width(totalPercentage.toFixed()+'%');
            $('#totalReport').find('.progress-description').html(totalPercentage.toFixed()+'% Bills in Total');
            //completed
            $('#completeReport').find('.info-box-number').html(result[2]);
            var completePercentage = (result[2]/result[0])*100;
            $('#completeReport').find('.progress-bar').width(completePercentage.toFixed()+'%');
            $('#completeReport').find('.progress-description').html(completePercentage.toFixed()+'% Completed in Total Bills');
            //pending
            var pendingPercentage = (result[1]/result[0])*100;
            $('#pendingReport').find('.info-box-number').html(result[1]);
            $('#pendingReport').find('.progress-bar').width(pendingPercentage.toFixed()+'%');
            $('#pendingReport').find('.progress-description').html(pendingPercentage.toFixed()+'% Pending in Total Bills');
            //today
             $('#todayReort').find('.info-box-number').html(result[3]);
             var todayPercentage = (result[3]/result[0])*100;
             $('#todayReort').find('.progress-bar').width(todayPercentage.toFixed()+'%');
             $('#todayReort').find('.progress-description').html(todayPercentage.toFixed()+'% Bills in Total');
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

function todayPayment(){
    let data = adminData;
    var date = new Date();
    date = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`; 
    data.payDate = date;
    $.ajax({
        url:`${apiUrl}api/paymentDate`,
        type: "POST",
        data: data,
        success: function(result){
            console.log(result);
            var total = 0;
            if(result.length>0){
                $.each(result, (k,v)=>{
                    total += parseFloat(v.amount);
                })
            }

            $('.todayPayment').html(numberWithCommas(parseFloat(total).toFixed(2)));
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

function last30Payment(){
    let data = adminData;
    var date = new Date();
    date = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`; 
    data.payDate = date;
    $.ajax({
        url:`${apiUrl}api/paymentLast30`,
        type: "POST",
        data: data,
        success: function(result){
            console.log(result);
            var payments = result;
            var labels = [], data = []; 
            for(var i=payments.length-1; i>=0; i--){
                labels.push(payments[i][0]);
                data.push(payments[i][1]?payments[i][1]:0);
            }
            //-------------
            //- LINE CHART -
            //--------------
            var lineChartCanvas = $('#lineChart').get(0).getContext('2d')
            var lineChartData = {
                labels  : labels,
                datasets: [
                {
                    label               : 'Total payment',
                    backgroundColor     : 'rgba(60,141,188,0.9)',
                    borderColor         : 'rgba(60,141,188,0.7)',
                    pointRadius          : 2,
                    pointColor          : '#3b8bba',
                    pointStrokeColor    : 'rgba(60,141,188,1)',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data                : data
                },
                ]
            }

            var lineChartOptions = {
                maintainAspectRatio : false,
                responsive : true,
                legend: {
                display: false
                },
                scales: {
                xAxes: [{
                    gridLines : {
                    display : false,
                    }
                }],
                yAxes: [{
                    gridLines : {
                    display : false,
                    }
                }]
                }
            }
            lineChartData.datasets[0].fill = false;
//            lineChartData.datasets[1].fill = false;
            lineChartOptions.datasetFill = false

            var lineChart = new Chart(lineChartCanvas, { 
            type: 'line',
            data: lineChartData, 
            options: lineChartOptions
            })
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

function getTotalCenter(){
    let data = adminData;
    $.ajax({
        url:`${apiUrl}api/getTotalCenters`,
        type: "POST",
        data: data,
        success: function(result){
            console.log(result);
            var center = result;
             var labels = [], data = [], textColor = ['text-danger', 'text-success', 'text-warning', 'text-info', 'text-primary', 'text-secondary'];
             for(var i=0; i<center.length; i++){
                 labels.push(center[i][1]);
                 data.push(center[i][0]);
 //                $('#chartList').append('<li><i class="far fa-circle '+textColor[i]+'"></i> '+center[i].name+'</li>')
             }
             //-------------
             //- PIE CHART -
             //-------------
             // Get context with jQuery - using jQuery's .get() method.
               var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
               var pieData        = {
                 labels: labels,
                 datasets: [
                   {
                     data: data,
                     backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de','#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
                   }
                 ]
               }
               var pieOptions     = {
                 legend: {
                   display: false
                 }
               }
               //Create pie or douhnut chart
               // You can switch between pie and douhnut using the method below.
               var pieChart = new Chart(pieChartCanvas, {
                 type: 'doughnut',
                 data: pieData,
                 options: pieOptions      
               })
 
             //-----------------
             //- END PIE CHART -
            //  -----------------
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