var fbLogin = false;
var fbUserID;

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id))
    return; js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/ko_KR/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
  FB.init({
    appId: '406582053115617',
    cookie : true,
    xfbml : true,
    version : 'v2.12'
  });
  FB.Event.subscribe('auth.logout', logout_event);
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    userID = response.authResponse.userID;
    testAPI(userID);
  } else if (response.status === 'not_authorized') {
    FB.login(function(response) {
      userID = response.authResponse.userID;
      testAPI(userID);
    });
  } else if (response.status === 'unknonwn') {
  }
}

function testAPI(userID) {
  FB.api('/me', function(response) { });
  fbLogin = true;
  fbUserID = userID;
  $("#FBlogin-button").hide();
  $("div.g-signin2").hide();
  $("div#FBlogin-before").hide();
  $("img.FBlogin-Img")
    .attr("src",""+ "https://graph.facebook.com/" + userID + "/picture?type=large");
  $("img.FBlogin-Img").show();
  $("img.PostPicture")
    .attr("src",""+ "https://graph.facebook.com/" + userID + "/picture?type=large");
  $("img.ModifyPicture")
    .attr("src",""+ "https://graph.facebook.com/" + userID + "/picture?type=large");

  if(particleData) {
    check_me(particleData);
    check_Like(particleData);
  }
}


var logout_event = function(response) {
  FB.logout(function(response) {
  });
}

//facebook logout with refresh cache
$(document).ready(function() {
  $("img.FBlogin-Img").click( function() {
    if(window.confirm("로그아웃 하시겠습니까?")){
      window.location.reload(true);
    }
  });
});

