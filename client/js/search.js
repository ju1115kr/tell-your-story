$("input[name='search']").keypress(function(e){
  if(e.keyCode == 13){
    if($("input[name='search']").val() === ""){ return false; }

    result = ajaxQuery(type='get', 
        apiURL='/search/particle/'+$("input[name='search']").val());
    console.log(result);

    update(result);
/*
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
*/

  }
});

$("button#searchButton").click(function() {
    if($("input[name='search']").val() === ""){ return false; }
    result = ajaxQuery(type='get', 
        apiURL='/search/particle/'+$("input[name='search']").val());

    console.log(result);

    update(result);

/*
    for(i=0; i < result.particle.length; i++) {
        dataset.particles.push(result.particle[i]);
    }

    svg.selectAll("image")
        .data(dataset.particles)
        .enter()
        .append("image")
        .attr('width', '20px')
        .attr('height', '20px')
        .attr(circleAttrs)
        .attr('xlink:href', "/picture/whitestar.png")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleMouseClick);
*/
});

function update(dataArray) {
    var t = d3.transition()
        .duration(750);

    var dataset = svg.selectAll("image")
        .data(dataArray.particles)

    dataset.exit()
            .attr("class", "exit")
        .transition(t)
            .attr("y", 60)
            .style("fill-opacity", 1e-6)
            .remove();

    dataset.enter().append("image")
            .attr("class", "enter")
            .style("fill-opacity", 1e-6)
    .transition(t)
        .style("fill-opacity", 1)
        .attr('width', '15px')
        .attr('height', '15px')
        .attr(circleAttrs)
        .attr('xlink:href', "/picture/whitestar.png")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleMouseClick);
}

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

