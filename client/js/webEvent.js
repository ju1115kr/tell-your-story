//letter close 버튼 클릭 시
$("a.letterClose").click(function() {
  $("div.letterForm").slideUp();
});

$("div#PostRequestForm > input").click(function() {
  $("div#PostRequestForm").hide();
  $("div#PostForm").slideDown();
});

$("a.PostFormClose").click(function() {
  $("div#PostForm").slideUp();
});

/*
$("Form").submit(function(e) {
//  ajaxQuery(type='post', apiURL='', dataset=$("div#PostFormBox").serialize());
  $.ajax({
      type: "POST",
      url: "http://ju1115kr.iptime.org:9009/api/v1.0/particle",
      data: $("div#PostFormBox").serialize(),
      success: function(data) {
        alert(data);
      }
  });

  e.preventDefault();
});

*/

$("span#logoLink").click(function() {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for(i=0; i < tabcontent.length; i++){
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for(i=0; i < tablinks.length; i++){
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById("Universe").style.display = "block";
});

$("div#news-8").click(function() {
  $("div.news-main-content img").attr('src', '/picture/together.jpg');
  $("div.news-main-content video source").attr('src', '/movie/prototype.mp4');
  $("div.news-main-content video")[0].load();
  //comment for autoplay
  //$("div.news-main-content video")[0].play();
  $("div.news-letter").fadeOut();
  $("div.news-main-content").fadeIn();
});

$("a.news-main-Close").click(function() {
  $("div.news-letter").fadeIn();
  $("div.news-main-content video")[0].pause();
  $("div.news-main-content").fadeOut();
});
