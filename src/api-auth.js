var apiUrl = "https://cors-destroyer.herokuapp.com/http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
var username = "ussd";
var password = "ussd2019";
var actionPoint = "http://127.0.0.1/SwissKnife_dev_stage/databank.cgi";
var xhr = new  XMLHttpRequest();
var a;
var breakLine = null;
var dataToPass = JSON.stringify({
    "method":"select",
        "data":{
            "table":"keyword",
            "returnID":"1"
        }
});
var ussdcode;
var errors = ["Loadding..", "Loading..", "Loading.."]


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
            console.log(errors);
            dataParse = response;
            console.log(dataParse);
            parsing = JSON.parse(dataParse);
            console.log(parsing);
            console.log(parsing.methodResponse.content);
            splitUnderscore = parsing.methodResponse.content;
            splitSpace = splitUnderscore.split('_').join(') ');
            console.log(splitSpace);
            nextLine = splitSpace.split('|').join('<br>');
            var key1 = nextLine.match(/1/);
            var key2 = nextLine.match(/2/);
            var key3 = nextLine.match(/3/);
            var key4 = nextLine.match(/4/);
            var key5 = nextLine.match(/5/);
            var key6 = nextLine.match(/6/);
            var key7 = nextLine.match(/7/);
            var key8 = nextLine.match(/8/);
            var key9 = nextLine.match(/9/);
            console.log(key1);
            $('.firstMenu').html(nextLine);
            $('.entryPoint').text(parsing.methodResponse.actualkeyword);
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
                if ( $('#choiceCode').val() == key1 ){
                    menu1Call();
                    $('#choiceCode').hide();
                    $('#choiceCode2').show();
                    if ($('#choiceCode2').val() == '1'){
                        $('.loader').show();
                        alert('Wait for a confirmation text shortly');
                        location.reload();
                    }
                    else if($('#choiceCode2').val() == '0'){
                        $('#choiceCode').val('');
                        $('#choiceCode2').val('');
                        $('#choiceCode').show();
                        $('#choiceCode2').hide();
                        menuCall();
                    }
                }
                else if($('#choiceCode').val() == key2){
                    menu2Call();
                    $('#choiceCode').hide();
                    $('#choiceCode2').show();
                    if ($('#choiceCode2').val() == '1' ){
                        menu11Call();
                        $('#choiceCode2').hide();
                        $('#choiceCode3').show();
                        if ($('#choiceCode3').val() == '1' ){
                            alert('Wait for a confirmation text shortly');
                            location.reload();
                        }
                    }
                    else if($('#choiceCode2').val() == '2'){
                        menu12Call();
                        $('#choiceCode2').hide();
                        $('#choiceCode3').show();
                        if ($('#choiceCode3').val() == '1' ){
                            alert('Wait for a confirmation text shortly');
                        }
                    }
                    
                }
                else if($('#choiceCode').val() == key3){
                    menu3Call();
                    $('#choiceCode').val('');
                }
                else if($('#choiceCode').val() == key4){
                    menu4Call();          
                }
                else if($('#choiceCode').val() == key5){          
                    menu5Call();
                }
                else if($('#choiceCode').val() == key6){
                    alert('content 6');            
                    menu6Call();
                }
              
                else{
                    alert('Invalid choice try again');
                    $('#choiceCode').val('');
                    $('#choiceCode2').val('');
                    $('#choiceCode3').val('');
                }
            });
            
        },
        error: function(jqXHR,textStatus,errorThrown) {
            console.log(textStatus,errorThrown)
        },
    });


    /* API Calls */
    menuCall = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"1"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
                $('.loader').show();
            },
            success: function(response){
                menu1Parse = JSON.parse(response);
                console.log(menu1Parse);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                console.log(splitSpace);
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' '); 
                nextLine = splitSpace.split('|').join("<br/>");
                console.log(nextLine);
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
            },
            error: function(jqXHR,textStatus){
                $('.entryPoint').html('Error in loading contents, refresh to continue');
                $('.firstMenu').html(errors);
            }
        })
    };

    menu1Call = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"2"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
                $('.loader').show();
            },
            success: function(response){
                menu1Parse = JSON.parse(response);
                console.log(menu1Parse);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                console.log(splitSpace);
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' '); 
                nextLine = splitSpace.split('|').join("<br/>");
                console.log(nextLine);
                var next1 = nextLine.match(/1/);
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
            },
            error: function(jqXHR,textStatus){
                $('.entryPoint').html('Error in loading contents, refresh to continue');
                $('.firstMenu').html(errors);
            }
        })
    };

    menu2Call = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"8"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
                $('.loader').show();
            },
            success: function(response){
                menu1Parse = JSON.parse(response);
                console.log(menu1Parse);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                console.log(splitSpace);
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' '); 
                nextLine = splitSpace.split('|').join("<br/>");
                console.log(nextLine);
                var key11 = nextLine.match(/1/);
                var key22 = nextLine.match(/2/);
                var key33 = nextLine.match(/3/);
                var key44 = nextLine.match(/4/);
                var key55 = nextLine.match(/5/);
                var key66 = nextLine.match(/6/);
                var key77 = nextLine.match(/7/);
                var key88 = nextLine.match(/8/);
                var key99 = nextLine.match(/9/);
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
                if ($('#choiceCode2').val() == key11 ){
                    menu11Call();
                    $('#choiceCode2').hide();
                    $('#choiceCode3').show();
                    if ($('#choiceCode3').val() == '1' ){
                        alert('Wait for a confirmation text shortly');
                        location.reload();
                    }
                }
                else if($('#choiceCode2').val() == key22 ){
                    menu12Call();
                    $('#choiceCode2').hide();
                    $('#choiceCode3').show();
                    if ($('#choiceCode3').val() == '1' ){
                        alert('Wait for a confirmation text shortly');
                    }
                }
                else {
                    alert('wrong choice')
                }
            },
            error: function(jqXHR,textStatus){
                console.log(textStatus);
                $('.entryPoint').html('Error in loading contents, refresh to continue');
                $('.firstMenu').html(errors);
            }
        })
    };

    menu3Call = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"9"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
                $('.loader').show();
            },
            success: function(response){
                menu1Parse = JSON.parse(response);
                console.log(menu1Parse);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                console.log(splitSpace);
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' '); 
                nextLine = splitSpace.split('|').join("<br/>");
                console.log(nextLine);
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
            },
            error: function(jqXHR,textStatus){
                console.log(textStatus);
                $('.entryPoint').html('Error in loading contents, refresh to continue');
            }
        })
    };

    menu4Call = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"10"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
                $('.loader').show();
            },
            success: function(response){
                menu1Parse = JSON.parse(response);
                console.log(menu1Parse);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                console.log(splitSpace);
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' '); 
                nextLine = splitSpace.split('|').join("<br/>");
                console.log(nextLine);
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
            },
            error: function(jqXHR,textStatus){
                console.log(textStatus);
                $('.entryPoint').html('Error in loading contents, refresh to continue');
            }
        })
    };

    menu5Call = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"11"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
                $('.loader').show();
            },
            success: function(response){
                menu1Parse = JSON.parse(response);
                console.log(menu1Parse);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                console.log(splitSpace);
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' '); 
                nextLine = splitSpace.split('|').join("<br/>");
                console.log(nextLine);
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
            },
            error: function(jqXHR,textStatus){
                console.log(textStatus);
                $('.entryPoint').html('Error in loading contents, refresh to continue');
            }
        })
    };

    menu6Call = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"12"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
                $('.loader').show();
            },
            success: function(response){
                menu1Parse = JSON.parse(response);
                console.log(menu1Parse);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                console.log(splitSpace);
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' '); 
                nextLine = splitSpace.split('|').join("<br/>");
                console.log(nextLine);
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
            },
            error: function(jqXHR,textStatus){
                console.log(textStatus);
                $('.entryPoint').html('Error in loading contents, refresh to continue');
            }
        })
    };


    menu7Call = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"13"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
                $('.loader').show();
            },
            success: function(response){
                menu1Parse = JSON.parse(response);
                console.log(menu1Parse);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                console.log(splitSpace);
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' '); 
                nextLine = splitSpace.split('|').join("<br/>");
                console.log(nextLine);
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
            },
            error: function(jqXHR,textStatus){
                console.log(textStatus);
                $('.entryPoint').html('Error in loading contents, refresh to continue');
            }
        })
    };

    menu8Call = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"14"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
                $('.loader').show();
            },
            success: function(response){
                menu1Parse = JSON.parse(response);
                console.log(menu1Parse);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                console.log(splitSpace);
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' '); 
                nextLine = splitSpace.split('|').join("<br/>");
                console.log(nextLine);
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
            },
            error: function(jqXHR,textStatus){
                console.log(textStatus);
                $('.entryPoint').html('Error in loading contents, refresh to continue');
            }
        })
    };

    menu9Call = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"15"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader ("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader ("Action", actionPoint);
                $('.loader').show();
            },
            success: function(response){
                menu1Parse = JSON.parse(response);
                console.log(menu1Parse);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                console.log(splitSpace);
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' '); 
                nextLine = splitSpace.split('|').join("<br/>");
                console.log(nextLine);
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
            },
            error: function(jqXHR,textStatus){
                console.log(textStatus);
                $('.entryPoint').html('Error in loading contents, refresh to continue');
            }
        })
    };

    menu11Call = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"16"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader("Action", actionPoint);
                $('.loader').show();
            },
            success : function(response){
                menu1Parse = JSON.parse(response);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' ');
                nextLine = splitSpace.split('|').join("<br/>");
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
            }
        })
    };

    menu12Call = function(){
        $.ajax({
            type:"POST",
            url: apiUrl,
            contentType:"json",
            data: JSON.stringify({
                "method":"select",
                    "data":{
                        "table":"keyword",
                        "returnID":"17"
                    }
            }),
            beforeSend : function(xhr){
                xhr.setRequestHeader("Basic", btoa(username + ":" + password));
                xhr.setRequestHeader("Action", actionPoint);
                $('.loader').show();
            },
            success : function(response){
                menu1Parse = JSON.parse(response);
                splitUnderscore = menu1Parse.methodResponse.content;
                splitSpace = splitUnderscore.split('_').join(') ');
                headerSplit = menu1Parse.methodResponse.actualkeyword.split('_').join(' ');
                nextLine = splitSpace.split('|').join("<br/>");
                $('.firstMenu').html(nextLine);
                $('.entryPoint').html(headerSplit);
                $('.loader').hide();
            }
        })
    };
    /* End of API Calls */
    
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

