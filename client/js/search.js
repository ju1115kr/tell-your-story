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
    old_dataset = result;

    if( $(window).innerWidth() < 990 ) {
        $("html, body").stop().animate({ scrollTop: 0 }, 1000);
    }
  }
});

function update(dataArray) {
    var t = d3.transition()
        .duration(750);

    var dataset = svg.selectAll("image.particle")
        .data(dataArray.particles);

    dataset.exit()
        .transition(t)
            .style("opacity", 0)
            .remove();

    dataset.data(dataArray.particles)
        .enter().append('image')
        .attr('class', "particle")
        .attr('width', size)
        .attr('height', size)
        .attr(circleAttrs)
        .attr('xlink:href', '/picture/whitestar.png')
        .style("opacity", 0)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        .on('click', handleMouseClick)
    .transition(t)
        .style("opacity", 1);
}

