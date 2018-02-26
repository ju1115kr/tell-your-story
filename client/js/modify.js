$("p#modify").click(function() {
    $("div.popup").hide();
    $("div.arrow").hide();

//    $("div.letterForm").slideUp();
    $("div.letterForm").hide();
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
    var jsondata = JSON.stringify({ author_id: fbUserID, 
        context: $("textarea#ModifyBox").val() });
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
