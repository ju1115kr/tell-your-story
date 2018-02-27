$("p#modify").click(function() {
    $("div.popup").hide();
    $("div.arrow").hide();

//    $("div.letterForm").slideUp();
    $("div.letterForm").hide();
    if (particleData.anonymous) {
        $("img.ModifyPicture").attr("src", "./picture/fb_man_image.jpg");
        $('input#Modifyanonymousbox').prop('checked', true);
    }
    else {
        $("img.ModifyPicture").attr("src","https://graph.facebook.com/" + particleData.author + "/picture?type=normal");
        $('input#Modifyanonymousbox').prop('checked', false);
    }
    $("textarea#ModifyBox").val(particleData.context);
//    $("div#ModifyForm").slideDown();
    $("div#ModifyForm").show();
    $("textarea#ModifyBox").focus();
    fillCircle( particleData.context.length, document.getElementById('Modifycircle'));
    canvas = document.getElementById('Modifycircle');
});

$("form.ModifyBody").submit(function(event) {
    event.preventDefault();
    if ($("textarea#ModifyBox").val()==="") {
        return false;
    }
    anonymous = $("input#Modifyanonymousbox").is(":checked") ? true : false
    var jsondata = JSON.stringify({ author_id: fbUserID, 
        context: $("textarea#ModifyBox").val(), anonymous: anonymous });
    var result;

    $.ajax({type: "put",
        url: API + "/particle/" + particleData.id,
        contentType: 'application/json; charset=utf-8',
        traditional: true,
        async: false,
        data: jsondata,
        success: function(data) {
            result = data;
            dataset.particles.pop(particleData);
            dataset.particles.push(result);
            svg.selectAll("image.particle").remove();
            drawParticles(dataset);

            if (anonymous) { $("div.letterPicture").attr("src", "./picture/fb_man_ima    ge.jpg"); }
            $("p.letterContextmessage").text(data.context);
            $("div#ModifyForm").slideUp();
            $("div.letterForm").slideDown();

            $("textarea#ModifyBox").val(data.context);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status, ajaxOptions, thrownError);
            return false;
        }
    });
});
