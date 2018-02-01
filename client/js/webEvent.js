$("a.letterClose").click(function() {
//  $("div.letterForm").hide();
  $("div.letterForm").slideUp();
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
  document.getElementById("Universe").style.display = "block";
});
