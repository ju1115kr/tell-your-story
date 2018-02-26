openPage("Galaxy", '',"");

var pageWidth = $(window).innerWidth();

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
    //document.getElementById(pageName).style.display = "block";

    if(pageName == "Galaxy") {

//        if ( !$("#Galaxy").is(":hidden") ) {
        if( $("#Galaxy").css('display') !== 'none') {
//        if ( $("#About").is(":hidden") || $("#News").is(":hidden") ) {
            if( $("div.letterForm").is(':visible') ) { $("div.letterForm").slideUp(); }
            if( $("div#PostForm").is(':visible') ) {
                if(window.confirm("작성 중인 글이 저장되지 않았습니다. 계속하시겠습니까?")) {
                    svg.selectAll("image.particle").remove();
                    dataset.particles.pop(newData);
                    drawParticles(dataset);
                    dataset = JSON.parse(JSON.stringify(old_dataset));
                    $("div#PostForm").slideUp();
                }
            }
            $("div#introduceBar").slideDown();
        }

        else {
            $("html").css("background-image", "url('../picture/web-background.jpg')");
            $("body").css("background-color", "rgba(0, 0, 0, 0)");
            $("body, html").css("background-repeat", "no-repeat");
            $("#"+pageName).show();
        }
    }

    if(pageName == "About") {
        $("#About").show();
        $("body, html").css("background-image", 'none');
        $("body, html").css("background-color", "#ADA8B3");
    }
    if(pageName == "News") {
        $("#News").show();
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
