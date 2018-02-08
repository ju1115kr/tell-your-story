$("div#news-8").click(function() {
  $("h2.news-main-content-header-title").text("8번 째 기사");
  $("p.news-main-content-text").text("8번 째 기사의 내용");
  $("p.news-main-content-date").text("2018. 2. 4. 21:59");

  $("div.news-main-content img").attr('src', '/picture/together.jpg');
  $("div.news-main-content video source").attr('src', '/movie/prototype.mp4');
  $("div.news-main-content video")[0].load();
  //comment for autoplay
  //$("div.news-main-content video")[0].play();

  //$("div.news-letter").fadeOut();
  //$("div.news-main-content").fadeIn();
});


$("div.news-letter").click(function() {
  $("div.news-letter").fadeOut();
  $("div.news-main-content").fadeIn();
});



$("a.news-main-Close").click(function() {
  $("div.news-letter").fadeIn();
  $("div.news-main-content video")[0].pause();
  $("div.news-main-content").fadeOut();
})
