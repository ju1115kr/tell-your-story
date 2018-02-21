openPage("Galaxy", '',"");

function openPage(pageName, elmnt, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for(i=0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablink");
    for(i=0; i < tablinks.length; i++){
        tablinks[i].style.backgroundColor = "";
        tablinks[i].style.fontWeight = 'normal';
    }
    document.getElementById(pageName).style.display = "block";

    if(pageName == "Galaxy") {
        $("html").css("background-image", "url('../picture/web-background.jpg')");
        $("body").css("background-color", "rgba(0, 0, 0, 0)");
        $("body, html").css("background-repeat", "no-repeat");
        document.getElementById(pageName).style.display = "flex";
    }
    if(pageName == "About") {
        $("body, html").css("background-image", 'none');
        $("body, html").css("background-color", "#ADA8B3");
    }
    if(pageName == "News") {
        $("body, html").css("background-image", 'none');
        if($("div.news-main-content").is(':visible')){
            $("div.news-main-content").fadeOut();
        }
    }

    if(elmnt !== '') {
        elmnt.style.fontWeight = 'bold';
    }
}
document.getElementById("defaultOpen").click();
