$(document).ready(function() {
    $("img.letterStarplus").click(function() {
        like(particleData);
    });
});

function check_Like(d) {
    if(d.likes.includes(parseInt(fbUserID))) {
        $("img.letterStarplus").css('opacity', '1');
    }
    else { $("img.letterStarplus").css('opacity', '0.3'); }
}

function like(d) {
    console.log("called like function");
    if(!fbUserID) {
        //alert("페이스북 로그인이 필요합니다.");
        console.log("like needs fb Login");
        return false;
    }

    if(!d.likes.includes(parseInt(fbUserID))) {
        $("p.letterLikeCount").text( parseInt($("p.letterLikeCount").text()) + 1);
        $("img.letterStarplus").css('opacity', '1');

        var jsondata = JSON.stringify({userID: fbUserID});
        console.log(jsondata);

        var result;
        $.ajax({type: "post",
            url: API + "/particle/" + d.id + "/like",
            contentType: 'application/json; charset=utf-8',
            traditional: true,
            async: false,
            data: jsondata,
            success: function(data) {
                console.log(data);
                result = data;
                d.likes.push(parseInt(fbUserID));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status, ajaxOptions, thrownError);
                return false;
            }
        });
    }

    else if(d.likes.includes(parseInt(fbUserID))) {
        $("p.letterLikeCount").text( parseInt($("p.letterLikeCount").text()) - 1);
        $("img.letterStarplus").css('opacity', '0.3');

        var jsondata = JSON.stringify({userID: fbUserID});
        var result;
        console.log(jsondata);
        $.ajax({type: "delete",
            url: API + "/particle/" + d.id + "/like",
            contentType: 'application/json; charset=utf-8',
            traditional: true,
            async: false,
            data: jsondata,
            success: function(data) {
                console.log(data);
                result = data;
                d.likes.pop(parseInt(fbUserID));
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status, ajaxOptions, thrownError);
                return false;
            }
        });
 
    }
}

