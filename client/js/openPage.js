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
        $("body, html").css("background-color", "#1b0c26");
    }
    else {
        $("body, html").css("background-color", "#ADA8B3");
    }

    if(elmnt !== '') {
        elmnt.style.fontWeight = 'bold';
    }
}
document.getElementById("defaultOpen").click();
