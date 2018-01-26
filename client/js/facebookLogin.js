var API = 'http://ju1115kr.iptime.org:9009/api/v1.0';

function ajaxQuery(type, apiURL, dataset) {
    $.ajax({type: type,
        url: API + apiURL,
        contentType: 'application/json; charset=utf-8',
        traditional: true,
        data: JSON.stringify(dataset),
        success: function(data){ console.log(data); return(data);},
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status, ajaxOptions, thrownError);
            return(false);
        }
    });
}

function ajaxTest(){
    var SendInfo = { author_id:"123", context:"test", x:0, y:0 };

    ajaxQuery(type='get', apiURL='/particle', dataset=SendInfo);

    //$.ajax({
    //    type: 'post',
    //    url: 'http://ju1115kr.iptime.org:9009/api/v1.0/particle',
    //    data: JSON.stringify(SendInfo),
    //    contentType: "application/json; charset=utf-8",
    //    traditional: true,
    //    success: function(data, response){
    //        console.log(data);
    //        console.log(response);
    //    }
    //});

    //$.ajax({
    //    type: 'get',
    //    url: 'http://ju1115kr.iptime.org:9009/api/v1.0/particle',
    //    contentType: 'application/json; charset=utf-8',
    //    traditional: true,
    //    success: function(data, response){
    //        if (data !== "[]") {
    //            console.log(data.particles);
    //            for(i=0; i<data.particles.length; i++) {
    //                var date = new Date(data.particles[i].created_at);
    //                console.log(date.toLocaleDateString());
    //                console.log(date.toLocaleTimeString());
    //            }
    //        }
    //        else { console.log("No data inside"); }
    //    }
    //});
}

ajaxTest();

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    if (response.status === 'connected') {
        console.log(response.authResponse.userID);
        userID = response.authResponse.userID;
        testAPI(userID);
    } else if (response.status === 'not_authorized') {
        //document.getElementById('status').innerHTML = 'Please log' + 'into this app.';
    } else {
        //document.getElementById('status').innerHTML = 'Please log' + 'into Facebook.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function testAPI(userID) {
    console.log('Welcome! Fetching your information');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        //document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
    });
    $("#fbLoginButton").hide();
    $("img#myPicture")
        .attr("src",""+ "https://graph.facebook.com/" + userID + "/picture?type=normal");
    $("form#particleBroadcast").show();
}

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
    return; js = d.createElement(s);
js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


window.fbAsyncInit = function() {
    FB.init({
        appId : '1339808736124796',
        cookie : true,
        xfbml : true,
        version : 'v2.11'
    });
}
