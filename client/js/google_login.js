var googleUserImage;

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  //console.log("ID Token: " + id_token);

  googleUserImage = profile.getImageUrl();
  $("FBlogin-button").hide();
  $("div.g-signin2").hide();
  $("img.letterImg").attr("src", googleUserImage);
  $("img#PostFormImg").attr("src", googleUserImage);

};
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.singOut().then(function () {
  });
}
function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': false,
    'thema': dark,
    'onsuccess': onSuccess
  });
}
