$("input[name='search']").keypress(function(e){
  if(e.keyCode == 13){
    if($("input[name='search']").val() === ""){
        alert("검색할 키워드를 입력해주세요.");
        return false;
    }

    result = ajaxQuery(type='get', 
        apiURL='/search/particle/'+$("input[name='search']").val());
    console.log(result);

    update(result);
    dataset = result;
  }
});

$("button#searchButton").click(function() {
    if($("input[name='search']").val() === ""){ return false; }
    result = ajaxQuery(type='get', 
        apiURL='/search/particle/'+$("input[name='search']").val());
    console.log(result);

    update(result);

});

function update(dataArray) {
    var t = d3.transition()
        .duration(750);

    var dataset = svg.selectAll("image.particle")
        .data(dataArray.particles, function(d) { return d; });

    dataset.exit()
            .attr("class", "exit")
        .transition(t)
            //.attr("y", 60)
            .style("fill-opacity", 0)
            .remove();

    dataset.attr("class", "update")
            .attr("class", "particle")
            .attr("y", 0)
            .style("fill-opacity", 1)
            .attr('width', size)
            .attr('height', size)
            .attr(circleAttrs)
            .attr('xlink:href', "/picture/whitestar.png")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", handleMouseClick);
//        .transition(t)
//            .attr("x", function(d,i ) { return i; });

    dataset.enter().append("image")
            .attr("class", "enter")
            .attr("class", "particle")
            .attr("y", -60)
            .attr("x", function(d, i) {return i; })
            .style("fill-opacity", 1e-6)
    .transition(t)
//        .attr("y", 0)
        .style("fill-opacity", 1);
}

function handleMouseOver(d, i) {
    d3.select(this)
        .attr('xlink:href', "/picture/yellowstar.png")
    $("div#dummyDiv").show();
}

function handleMouseOut(d, i) {
    d3.select(this)
        .attr("xlink:href", "/picture/whitestar.png")
    $("div#dummyDiv").hide();
}

function handleMouseClick(d, i) {
    if( $("div#PostForm").is(':visible') ){
        console.log("hu");
        return false;
    }
    if ($("div#dummyDiv").is(':visible')){
        if (d.author != 'null') { $("img.letterImg").attr("src","https://graph.facebook.com/" + d.author + "/picture?type=normal");}
        if (d.googleUserImg != 'null') { $("img.letterImg").attr("src", d.googleUserImg); }

        $('p.createdDate').text(formatDate(d.created_at));
        $('p.letterLikeCount').text(d.likes_count);
        $('p.letterContext').text(d.context);
        $('div.letterForm').slideDown();
    }
   else {
        return false;
    }
}

function formatDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    hour = d.getHours();
    minute = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-') + " " + [hour, minute].join(':');
}

