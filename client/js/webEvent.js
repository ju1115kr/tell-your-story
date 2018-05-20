$("img.option").click(function () {
  if ($("div.popup").is(':visible')) {
    $("div.popup").hide();
    $("div.arrow").hide();
  }
  else {
    $("div.popup").show();
    $("div.arrow").show();
  }
});

//letter close 버튼 클릭 시
$("a.letterClose").click(function () {
  $("div.letterForm").slideUp();
});

$("div#PostRequestForm > input").click(function () {
  $("div#PostRequestForm").hide();
  $("div#PostForm").slideDown();
});

$("a.PostFormClose").click(function () {
  $("div#PostForm").slideUp();
});

