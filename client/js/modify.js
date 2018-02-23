$("p#modify").click(function() {
    $("div.popup").hide();

    $("div.letterForm").slideUp();
    $("textarea#ModifyBox").val(particleData.context);
    $("div#ModifyForm").slideDown();
    $("textarea#ModifyBox").focus();
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

            console.log(data);
            $("p.letterContextmessage").text(data.context);
            $("div#ModifyForm").slideUp();
            $("div.letterForm").slideDown();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status, ajaxOptions, thrownError);
            return false;
        }
    });
});
