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
    $("img.letterImg")
        .attr("src",""+ "https://graph.facebook.com/" + userID + "/picture?type=normal");
    $("div.letterForm").show();
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
