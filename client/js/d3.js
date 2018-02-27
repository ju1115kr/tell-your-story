$("div#introdiv").css("margin-top", window.outerHeight / 15);

// Galaxy script start
var w = $("div#stardustForm").width() / 1.7,
    h = window.innerHeight * 0.6,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    radius = 6,
    refresh_size = 90,
    size = '11px',
    newData,
    particleData;

//Mobile View Respons
//if(window.innerWidth <= 1000  && $(window).height() >= 1000) {
if(window.innerWidth < 990) {
    w = window.innerWidth / 1.5,
    h = window.innerHeight * 0.5,
    refresh_size = 150,
    size = '35px';
}

var svg = d3.select("div#stardustForm").append("svg").attr({
    width: w,
    height: h
});

var dataset = ajaxQuery(type='get', apiURL='/particle/random');

// We're passing in a function in d3.max to tell it what we're maxing (x value)
/*var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset.particles, function (d) { return d.x + 10; })])
    .range([margin.left, w - margin.right]);  // Set margins for x specific

// We're passing in a function in d3.max to tell it what we're maxing (y value)
var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset.particles, function (d) { return d.y + 10; })])
    .range([margin.top, h - margin.bottom]);  // Set margins for y specific*/

var xScale = d3.scale.linear()
    .domain([0, 1010])
    .range([margin.left, w - margin.right]);  // Set margins for x specific

// We're passing in a function in d3.max to tell it what we're maxing (y value)
var yScale = d3.scale.linear()
    .domain([0, 1010])
    .range([margin.top, h - margin.bottom]);  // Set margins for y specific

// Add a X and Y Axis (Note: orient means the direction that ticks go, not position)
var xAxis = d3.svg.axis().scale(xScale).orient("top");
var yAxis = d3.svg.axis().scale(yScale).orient("left");

var tooltip = d3.select("div#stardustForm").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var circleAttrs = {
    x: function(d) { return xScale(d.x) - 7.5; },
    y: function(d) { return yScale(d.y) - 7.5; }
};

d3.selection.prototype.last = function() {
    var last = this.size() - 1;
    return d3.select(this[0][last]);
};

function refreshData() {
    dataset = ajaxQuery(type='get', apiURL='/particle/random');
    old_dataset = JSON.parse(JSON.stringify(dataset));

    svg.selectAll("image.particle").remove();
    fadeParticles(dataset, duration=750);
    $("img#refresh").rotate({
        angle: 0,
        animateTo: 180,
        easing: $.easing.easeInOutElastic
    });
    if( $("div.letterForm").is(":visible") ) {
        $("div.letterForm").slideUp();
        $("div#introduceBar").slideDown();
    }
    
}

drawParticles(dataset);

// On Click, we want to add data to the array and chart
svg.on("click", function() {
    for( i = 0; i < svg.selectAll("image")[0].length; i++ ) {
        if ( $(svg.selectAll("image")[0][i]).attr('href') == "/picture/yellowstar.png" ) {
            return false;
        }
    }
    //if cursor does not pointing already exist particle
    //if( $("div#particleDummy").is(':visible') ){
    if( $("div#particleDummy").is(':visible') ){
        return false;
    }
 
    if( $("div#PostForm").is(':visible') ){
        svg.selectAll("image.particle").remove();
        dataset.particles.pop(newData);
        drawParticles(dataset);
        dataset = JSON.parse(JSON.stringify(old_dataset));
//        return false;
    }

/*    if( $("div#ModifyForm").is(":visible") ) {
        if( window.confirm("수정 중인 글이 저장되지 않았습니다. 계속하시겠습니까?") ) {
            $("div#ModifyForm").slideUp();
            svg.selectAll("image.particle").remove();
            drawParticles(dataset);
        } else return false;
    }*/

   
        
    if(!fbLogin) {
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
    canvas = document.getElementById('Postcircle');
    $("div.letterForm").slideUp();
    //$("div.letterForm").hide();
    //$("div#PostForm").slideDown();
    $("div#introduceBar").hide();
    $("#particleDummy").hide();

    if( $(window).innerWidth() < 990 ) {
        var body = $("html, body");
        body.stop().animate({scrollTop: $("div#PostForm").prop('scrollHeight')});
    }

    $("form.PostBody").submit(function(event) {
        event.preventDefault();
        if ($("textarea#PostBox").val()==="") {
            return false;
        }
        else {
            anonymous = $("input#Postanonymousbox").is(':checked') ? true : false
            jsondata = JSON.stringify({ author_id: fbUserID, googleUserImage: googleUserImage,
                context: $("textarea#PostBox").val(), x: newData.x, y: newData.y, anonymous: anonymous
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

                if( $(window).innerWidth() < 990 ) { 
                    $("html, body").stop().animate({ scrollTop: 0 }, 1000);
                }
                drawParticles(dataset);
                twinkleParticle();

                $("div#PostForm").slideUp();
                $("div#introduceBar").slideDown();
            }
            else if(!redirect_url) {
                //error handling
                return false;
            }
        }
    });
})

svg.on('dbclick', function() { return false;} );


$("svg").hide();
$("svg").delay(800).fadeIn(1000);
$("div#aside").hide();
$("div#aside").delay(800).fadeIn(1000);
$("div#introduceBar").hide();
$("div#introduceBar").delay(1000).fadeIn(1000);
//
//$("svg").delay(5000).fadeIn(400);
//setTimeout(twinkleParticle, 5500);

// Create Event Handlers for mouse
function handleMouseOver(d, i) {  // Add interactivity

    // Use D3 to select element, change color and size
    d3.select(this)
        .attr('xlink:href', "/picture/yellowstar.png")

    //tip.show();
    $("div#particleDummy").show();

    if (d.context) {
        tooltip.html(d.context.substring(0, 20)+"···")
            .style("left", (d3.event.pageX + 8) + "px")
            .style("top", (d3.event.pageY - 67) + "px");
        tooltip.transition()
            .duration(100)
            .style("opacity", .9);
    }
}

function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this)
      .attr("xlink:href", "/picture/whitestar.png")

    //tip.hide();
    $("div#particleDummy").hide();
    tooltip.transition()
        .style("left", "0px")
        .style("top", "0px")
        .duration(0)
        .style("opacity", 0);
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
        if ( $("div#ModifyForm").is(":visible")) {
            if ( window.confirm("수정 중인 글이 저장되지 않았습니다. 계속하시겠습니까?") ) {
                $("div#ModifyForm").slideUp();
            } else return false;
        }

        if ( $("div#PostForm").is(':visible')) {
            $("div#PostForm").slideUp();
            svg.selectAll("image.particle").remove();
            dataset.particles.pop(newData);
            drawParticles(dataset);
            dataset = JSON.parse(JSON.stringify(old_dataset));
        }
        particleData = d;
        if(d.context) {
            //particleData = d;
            $("img.letterPicture").attr("src","https://graph.facebook.com/" + d.author + "/picture?type=normal");
            if (d.anonymous || d.anonymous == null) { $("img.letterPicture").attr("src","../picture/fb_man_image.jpg"); }
            //$('p.createdDate').text(formatDate(d.created_at));
            $('p.createdDate').html(formatDate(d.created_at));
            $('p.letterLikeCount').text(d.likes_count);
            $('p.letterContextmessage').text(d.context);

            check_me(d);
            check_Like(d);

            $('div.letterForm').slideDown();
            
            if( $(window).innerWidth() < 990 ) {
                var body = $("html, body");
                body.stop().animate({scrollTop: $(document).height() }, 1000);
            }
        }
        else {
            $("div#particleDummy").hide();
            return false;
        }
    }
    else {
        return false;
    }

    //$("img.letterStarplus").click(d, like(d));
}

function formatDate(date) {
    var d = new Date(date),
    AMPM = " AM",

    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    hour = d.getHours();
    minute = d.getMinutes();

    if (hour >=13) { hour -= 12; AMPM = " PM"; }

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.toString().length < 2) hour = '0' + hour;
    if (minute.toString().length < 2) minute = '0' + minute;

    return [year, month, day].join('.') + "&nbsp; " + [hour, minute].join(':') + AMPM;
}

function fadeParticles(dataset, duration) {
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

function drawParticles(dataset) {

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
        .on("click", handleMouseClick);
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

function check_me(d) {
    if( parseInt(fbUserID) == d.author ) {
        $("img.option").show();
        $("div.popup").hide();
        $("div.arrow").hide();
    }
    else {
        $("img.option").hide();
        $("div.popup").hide();
        $("div.arrow").hide();
    }
}
