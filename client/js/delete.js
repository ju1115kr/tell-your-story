$("p#delete").click(function() {
    $("div.popup").hide();
    $("div.arrow").hide();

    if (window.confirm("정말로 이 글을 삭제하시겠습니까?")) {
        var jsondata = JSON.stringify({ author_id: fbUserID });
        var result;

        $.ajax({type: "delete",
            url: API + "/particle/" + particleData.id,
            contentType: 'application/json; charset=utf-8',
            traditional: true,
            async: false,
            data: jsondata,
            success: function(data) {
                result = data;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status, ajaxOptions, thrownError);
                return false;
            }
        });

        svg.selectAll("image.particle").remove();
        dataset.particles.pop(particleData);
        drawParticles(dataset);

        $("div.letterForm").slideUp();
        $("div#introduceBar").slideDown();
    }
});
