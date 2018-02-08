//처음 웹 렌더링 시 letterForm 숨기기
$("div.letterForm").hide();

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

