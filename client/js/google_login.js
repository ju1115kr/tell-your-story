var googleUserImage;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    googleUserImage = profile.getImageUrl();
    $("FBlogin-button").hide();
    $("div.g-signin2").hide();
    $("img.letterImg").attr("src", googleUserImage);
    $("img#PostFormImg").attr("src", googleUserImage);

};
function signOut() {
    //<a href="#" onclick="signOut();">Sign out</a>
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.singOut().then(function () {
        console.log('User signed out.');
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
