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
            .style("opacity", 0)
            .remove();

    dataset.attr("class", "update")
            .attr("class", "particle")
            .style("opacity", 1)
            .attr('width', size)
            .attr('height', size)
            .attr(circleAttrs)
            .attr('xlink:href', "/picture/whitestar.png")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", handleMouseClick)

    dataset.enter().append("image")
            .attr("class", "enter")
            .attr("class", "particle")
            .style("opacity", 0)
    .transition(t)
        .style("opacity", 1);
}


