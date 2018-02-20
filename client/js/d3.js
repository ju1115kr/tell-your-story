$("div#introdiv").css("margin-top", window.outerHeight / 15);
//$("h3#introment").slideUp(0).delay(500).fadeIn(1000);
//$("h3#introment").delay(2000).fadeOut(1000);

// Galaxy script start
var //w = window.innerWidth / 1.2,
    w = $("div#stardustForm").width() / 1.2,
    h = window.innerHeight * 0.6,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    radius = 6,
    refresh_size = 90,
    size = '11px',
    newData;

//Mobile View Respons
if(window.innerWidth <= 1000  && $(window).height() >= 1000) {
    w = window.innerWidth / 1,
    h = window.innerHeight * 0.8,
    refresh_size = 150,
    size = '45px';
}

var svg = d3.select("div#stardustForm").append("svg").attr({
    width: w,
    height: h
});

var dataset = ajaxQuery(type='get', apiURL='/particle/random');

// We're passing in a function in d3.max to tell it what we're maxing (x value)
var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset.particles, function (d) { return d.x + 10; })])
    .range([margin.left, w - margin.right]);  // Set margins for x specific

// We're passing in a function in d3.max to tell it what we're maxing (y value)
var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset.particles, function (d) { return d.y + 10; })])
    .range([margin.top, h - margin.bottom]);  // Set margins for y specific

// Add a X and Y Axis (Note: orient means the direction that ticks go, not position)
var xAxis = d3.svg.axis().scale(xScale).orient("top");
var yAxis = d3.svg.axis().scale(yScale).orient("left");


var circleAttrs = {
    x: function(d) { return xScale(d.x) - 7.5; },
    y: function(d) { return yScale(d.y) - 7.5; }
};

d3.selection.prototype.last = function() {
    var last = this.size() - 1;
    return d3.select(this[0][last]);
};

/*svg.append('image')
    .attr('id', 'refresh')
    .attr('width', refresh_size + 'px')
    .attr('height', refresh_size + 'px')
    .attr('x', $("svg").width() - refresh_size)
    .attr('y', 0)
    .attr('xlink:href', "/picture/refresh.png")
    .on("mouseover", function() { $("div#refreshDummy").show(); })
    .on("mouseout", function() { $("div#refreshDummy").hide(); })
    .on("click", function(d) {
        dataset = ajaxQuery(type='get', apiURL='/particle/random');
        svg.selectAll("image.particle").remove();
        drawParticles(dataset, duration=750);
    });*/

function refreshData() {
    dataset = ajaxQuery(type='get', apiURL='/particle/random');
    svg.selectAll("image.particle").remove();
    drawParticles(dataset, duration=750);
}

var tip = d3.tip()
    .attr('class', 'tip')
    .offset([-10, 0])
    .html(function(d) { console.log(d); return d; });

svg.call(tip);

drawParticles(dataset);

    // On Click, we want to add data to the array and chart
svg.on("click", function() {
    if( $("div#PostForm").is(':visible') ){
        console.log('a');
        return false;
    }
/*
    if( $("div#refreshDummy").is(':visible') ){
        return false;
    }
    if( $("div.letterForm").is(':visible') ){
        return false;
    }
*/
    //if cursor does not pointing already exist particle
    if( $("div#particleDummy").is(':hidden') ){
        
        if(!fbLogin) {
            console.log("User doesn't login in fb");
            alert('페이스북 로그인이 필요합니다.');
            //checkLoginState();
            return false;
        }
        
        var coords = d3.mouse(this);

        newData = {
            x: Math.round( xScale.invert(coords[0]) ),
            y: Math.round( yScale.invert(coords[1]) )
        };

        old_dataset = JSON.parse(JSON.stringify(dataset));
        
        dataset.particles.push(newData);   // Push data to our array
        drawParticles(dataset);

        $("div#PostForm").slideDown();
        $("div.letterForm").slideUp();
        $("div#introduceBar").hide();

        //if user cancle texting clicked X
        $("a.PostFormClose").click(function() {
            $("div#PostForm").slideUp();
            svg.selectAll("image.particle").remove();
            dataset.particles.pop(newData);
            drawParticles(old_dataset);
            
            dataset = JSON.parse(JSON.stringify(old_dataset));
        });
        // if user cancle texting press escape key
        /*
        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                $("div#PostForm").slideUp();
                svg.selectAll("image.particle").remove();
                dataset.particles.pop(newData);
                drawParticles(old_dataset);

                dataset = JSON.parse(JSON.stringify(old_dataset));
            }
        });*/

        $("form.PostBody").submit(function(event) {
            event.preventDefault();
            if ($("textarea#PostBox").val()==="") {
                console.log('empty text');
                console.log($("textarea#PostBox").val());
                return false;
            }
            else {
                jsondata = JSON.stringify({ author_id: fbUserID, googleUserImage: googleUserImage,
                    context: $("textarea#PostBox").val(), x: newData.x, y: newData.y
                });

                $.ajax({type: "post",
                    url: API + "/particle",
                    contentType: 'application/json; charset=utf-8',
                    traditional: true,
                    async: false,
                    data: jsondata,
                    complete: function(xhr) {
                        if (xhr.status == 201) {
                            redirect_url = xhr.getResponseHeader("location");
                        }
                    }
                });

                if(redirect_url) { // if posting success
                    $("div#PostForm").slideUp();
                    $("form").trigger("reset");
                    $.ajax({type: "get",
                        url: redirect_url,
                        contentType: "apllication/json; charset=utf-8",
                        traditional: true,
                        async: false,
                        success: function(data) {
                            newParticle = data;
                        }
                    });
                    dataset.particles.pop(newData);
                    dataset.particles.push(newParticle);
                    old_dataset = dataset;

                    drawParticles(dataset);
                    twinkleParticle();

                    $("div#PostForm").slideUp();
                    $("div.letterForm").slideDown();
                }
                else if(!redirect_url) {
                    //error handling
                    console.log("Something wrong :0");
                    return false;
                }
            }
        });
    }

    else {
        //Handling wrong request;
        return false;
    }
})

$("svg").hide();
$("svg").delay(800).fadeIn(1000);
//$("svg").delay(5000).fadeIn(400);
//setTimeout(twinkleParticle, 5500);

// Create Event Handlers for mouse
function handleMouseOver(d, i) {  // Add interactivity

    // Use D3 to select element, change color and size
    d3.select(this)
        .attr('xlink:href', "/picture/yellowstar.png")

    //tip.show();
    $("div#particleDummy").show();
}

function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this)
      .attr("xlink:href", "/picture/whitestar.png")

    //tip.hide();
    $("div#particleDummy").hide();
}

function handleMouseClick(d, i) {
    /*if( $("div#PostForm").is(':visible') ){
        console.log("hu");
        return false;
    }*/

    if ($("div#particleDummy").is(':visible')){
        //if (d.author != 'null') { $("img.letterPicture").attr("src","https://graph.facebook.com/" + d.author + "/picture?type=normal");}
        //if (d.googleUserImg != 'null') { $("img.letterImg").attr("src", d.googleUserImg); }
        if ( $("div#introduceBar").is(':visible')) { $("div#introduceBar").slideUp(); }
        if ( $("div#PostForm").is(':visible')) {
            $("div#PostForm").slideUp();
            $("div#PostForm").hide();
            svg.selectAll("image.particle").remove();
            dataset.particles.pop(newData);
            drawParticles(dataset);
            dataset = JSON.parse(JSON.stringify(old_dataset));
        }

        if(d.context) {
            $("img.letterPicture").attr("src","https://graph.facebook.com/" + d.author + "/picture?type=normal");
            $('p.createdDate').text(formatDate(d.created_at));
            $('p.letterLikeCount').text(d.likes_count);
            $('p.letterContextmessage').text(d.context);
        }
        else {
            $("div#particleDummy").hide();
        }
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

function drawParticles(dataset, duration=0) {
    var t = d3.transition()
        .duration(duration);

    svg.selectAll("image")
        .data(dataset.particles)
        .enter().append('image')
        .attr('class', 'particle')
        .attr('width', size)
        .attr('height', size)
        .attr(circleAttrs)
        .attr('xlink:href', "/picture/whitestar.png")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleMouseClick)
        .style("opacity", 0)
    .transition(t)
        .style("opacity", 1);
}

function twinkleParticle() {
    var t = d3.transition()
        .duration(750);

    svg.selectAll("image.particle").last()
        .style("opacity", 0)
    .transition(t)
        .style("opacity", 1)
    .transition(t)
        .style("opacity", 0)
    .transition(t)
        .style("opacity", 1)
    .transition(t)
        .style("opacity", 0)
    .transition(t)
        .style("opacity", 1);
}

