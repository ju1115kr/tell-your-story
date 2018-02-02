$("input[name='search']").keypress(function(e){
  if(e.keyCode == 13){
    result = ajaxQuery(type='get', 
        apiURL='/search/particle/'+$("input[name='search']").val());
    console.log($("input[name='search']").val());
    console.log(result);

/*    
    for(i=0; i<result.particle.length; i++) {
        
        result.particle[i].x = Math.round( xScale.invert(result.particle[i].x));
        result.particle[i].y = Math.round( yScale.invert(result.particle[i].y));
        
        result.particle[i].x += 30;
        result.particle[i].y += 30;
    }
*/
    for(i=0; i < result.particle.length; i++) {
        dataset.particles.push(result.particle[i]);
    }

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
    svg.selectAll("image")
        .data(dataset.particles)
        .enter()
        .append("image")
        .attr('width', '15px')
        .attr('height', '15px')
        .attr('x', function(d) {return d.x;})
        .attr('y', function(d) {return d.y;})
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleMouseClick);
  }
});

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
