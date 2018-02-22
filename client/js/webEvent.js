if(window.location.search.includes("news")){
  search = window.location.search.substr(1);

  openPage("News", '', "");
  if( !search !== "news") {
      document.getElementById(search).click();
  }
  //if {
  //  $("div#" + search).click();
  //}
}
//처음 웹 렌더링 시 letterForm 숨기기
//$("div.letterForm").hide();

//letter close 버튼 클릭 시
$("a.letterClose").click(function() {
  $("div.letterForm").slideUp();
});

/*
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        $("div.letterForm").slideUp();
    }
});
*/

$("div#PostRequestForm > input").click(function() {
  $("div#PostRequestForm").hide();
  $("div#PostForm").slideDown();
});

$("a.PostFormClose").click(function() {
  $("div#PostForm").slideUp();
});

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
  document.getElementById("Galaxy").style.display = "block";
});

