$("div#news-1").on('click', kja);
$("div#news-2").on('click', kju);
$("div#news-3").on('click', kbk);
$("div#news-4").on('click', jun);
$("div#news-5").on('click', yks);
$("div#news-6").on('click', yjh);
$("div#news-7").on('click', kuj);
$("div#news-8").on('click', khm);
$("div#news-9").on('click', lsj);
$("div#news-10").on('click', kmd);
$("div#news-11").on('click', vlog_1);

$("div.news-letter").click(function() {
  $("div.news-main-content").fadeIn();
});

$("a.news-main-Close").click(function() {
  $("div.news-letter").fadeIn();
  $("div.news-main-content").fadeOut();
});

$("div.logoForm").click(function() {
  $("div.news-letter").show();
  $("div.news-main-content").hide();
});

if(window.location.search.includes("news")){
    search = window.location.search.substr(1);

    openPage("News", '', "");
    if( search !== "news") {
        $("div#"+search).trigger('click');
        //document.getElementById(search).click();
    }
}
