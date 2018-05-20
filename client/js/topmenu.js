var overlap = !($("logo-link").right < $("img.FBlogin-Img").left ||
  $("logo-link").left > $("img.FBlogin-Img").right ||
  $("logo-link").bottom < $("img.FBlogin-Img").top ||
  $("logo-link").top > $("img.FBlogin-Img").bottom)

if (overlap) { $("img.FBlogin-Img").hide(); }
else if (!overlap) { $("img.FBlogin-Img").show(); }

$(document).ready(function () {
  $("a#refresh").click(function () {
    window.location.reload(true);
  });
});
