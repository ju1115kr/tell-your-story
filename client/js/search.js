$("input[name='search']").keypress(function(e){
  if(e.keyCode == 13){
    if($("input[name='search']").val() === ""){ return false; }

    result = ajaxQuery(type='get', 
        apiURL='/search/particle/'+$("input[name='search']").val());
    console.log(result);

    for(i=0; i < result.particle.length; i++) {
        dataset.particles.push(result.particle[i]);
    }

    svg.selectAll("image")
        .data(dataset.particles)
        .enter()
        .append("image")
        .attr('width', '15px')
        .attr('height', '15px')
        .attr(circleAttrs)
        .attr('xlink:href', "/picture/whitestar.png")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleMouseClick);
  }
});

$("button#searchButton").click(function() {
    if($("input[name='search']").val() === ""){ return false; }
    result = ajaxQuery(type='get', 
        apiURL='/search/particle/'+$("input[name='search']").val());

    console.log(result);

    for(i=0; i < result.particle.length; i++) {
        dataset.particles.push(result.particle[i]);
    }

    svg.selectAll("image")
        .data(dataset.particles)
        .enter()
        .append("image")
        .attr('width', '15px')
        .attr('height', '15px')
        .attr(circleAttrs)
        .attr('xlink:href', "/picture/whitestar.png")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleMouseClick);

});
/*    
    for(i=0; i<result.particle.length; i++) {
        
        result.particle[i].x = Math.round( xScale.invert(result.particle[i].x));
        result.particle[i].y = Math.round( yScale.invert(result.particle[i].y));
        
        result.particle[i].x += 30;
        result.particle[i].y += 30;
    }
*/

/*    
    svg.selectAll("circle")
        .data(dataset.particles)
        .enter()
        .append("circle")
        .attr("cx", function(d) {return d.x;})
        .attr("cy", function(d) {return d.y;})
//        .attr("cx", function(d) { Math.round( xScale.invert(d.x)); })
//        .attr("cy", function(d) { Math.round( yScale.invert(d.y)); })
        .attr("r", radius)
//            .attr(circleAttrs)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleMouseClick);
*/

/*
    d3.json(result, function(error, data) {
        svg.selectAll("circle")
            .data(data.particle)
            .enter()
            .append("circle")
            .attr(circleAttrs)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", handleMouseClick);
    }); 
  }  
});*/
