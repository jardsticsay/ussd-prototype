var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
var username = "ussd";
var password = "ussd2019";
var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
var xhr = new  XMLHttpRequest();
var a;
var breakLine = null;
var dataToPass = JSON.stringify({
    "method":"getlist",
        "data":{
            "table":"keyword",
            "fieldName":"mainkeyword",
            "operator":"=",
            "lookup":"*121#"
        }
});
var ussdcode;



$(function (){
    
    $.ajax({
        type: "POST",
        url: apiUrl,
        contentType:"json",
        data:dataToPass,
        beforeSend : function(xhr){
            console.log('beforeSend');
            xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
            xhr.setRequestHeader ("Action", actionPoint);
        },
        success: function(response) {
            console.log('success');
            dataParse = response;
            console.log(dataParse);
            parsing = JSON.parse(dataParse);
            console.log(parsing);
            console.log(parsing.methodResponse.content);
            splitUnderscore = parsing.methodResponse.content;
            splitSpace = splitUnderscore.split('_').join(' ');
            console.log(splitSpace);
            nextLine = splitSpace.split('|').join('<br>');
            $('.firstMenu').html(nextLine);
            $('.entryPoint').text(parsing.methodResponse.mainkeyword);
            ussdcode = parsing.methodResponse.mainkeyword;
            console.log(ussdcode);
            console.log(parsing.methodResponse.actualkeyword);
            $("#dial").click(function(){    
                console.log('hide triger');
                if ( $('#entryNumber').val() ==  "" || $('#entryCode').val() == "" ){
                    alert('Please Enter your mobile number or USSD code to Proceed');
                } else if ( $('#entryNumber').val() <= 8 || $('#entryCode').val() != ussdcode ){
                    alert('ussdcode did not match');
                    $('#entryNumber').val('');
                    $('#entryCode').val('');
                } else {
                    alert('ussdcode match');
                    $('#content-container1').hide();
                    $('#content-container2').show(); 
                }
            });
            $('#sendReq').click(function(){
                if ( $('#choiceCode').val() == "1" ){
                    $('.firstMenu').html();
                }
            })
        },
        error: function(jqXHR,textStatus,errorThrown) {
            console.log(textStatus,errorThrown)
        },
    });
});


var insert_record = function(){
    $.ajax({
        type: "POST",
        url: apiUrl,
        contentType:"json",
        data:JSON.stringify({
            "method":"insert",
                "data":{
                    "table":"keyword"
                }
        }),
        beforeSend : function(xhr){
            console.log('beforeSend');
            xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
            xhr.setRequestHeader ("Action", actionPoint);
        },
    })
}
