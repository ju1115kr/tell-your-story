$("h3#introment").slideUp(300).delay(500).fadeIn(1000);
$("h3#introment").delay(2000).fadeOut(1000);

// Galaxy script start

var w = window.innerWidth / 1.2,
//    h = window.innerHeight - 405,
    h = window.innerHeight - 230,
//var w = $("body").width() * 1,
//    h = $("body").height() * 1.1,
    margin = { top: 40, right: 20, bottom: 20, left: 40 },
    radius = 6,
    size = '11px';

if(window.innerWidth < 960) { size = '20px'; }

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

/*
// Adds X-Axis as a 'g' element
svg.append("g").attr({
    "class": "axis",  // Give class so we can style it
    transform: "translate(" + [0, margin.top] + ")"  // Translate just moves it down into position (or will be on top)
}).call(xAxis);  // Call the xAxis function on the group

// Adds Y-Axis as a 'g' element
svg.append("g").attr({
    "class": "axis",
    transform: "translate(" + [margin.left, 0] + ")"
}).call(yAxis);  // Call the yAxis function on the group
*/

var tip = d3.tip()
    .attr('class', 'tip')
    .offset([-10, 0])
    .html(function(d) { console.log(d); return d; });

svg.call(tip);

svg.selectAll("image")
    .data(dataset.particles)
    .enter().append('image')
    .attr('width', size)
    .attr('height', size)
    .attr(circleAttrs)
    .attr('xlink:href', "/picture/whitestar.png")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("click", handleMouseClick);


    // On Click, we want to add data to the array and chart
svg.on("click", function() {
    if( $("div#PostForm").is(':visible') ){
        console.log("hu");
        return false;
    }
    if( $("div.letterForm").is(':visible') ){
        console.log();
        return false;
    }

    //if cursor does not pointing already exist particle
    if( $("div#dummyDiv").is(':hidden') ){
        
        if(!fbLogin) {
            console.log("User doesn't login in fb");
            alert('페이스북 로그인이 필요합니다.');
            //checkLoginState();
            return false;
        }
        
        var coords = d3.mouse(this);
        console.log(coords);

        var newData = {
            x: Math.round( xScale.invert(coords[0]) ),
            y: Math.round( yScale.invert(coords[1]) )
        };

        old_dataset = JSON.parse(JSON.stringify(dataset));
        
        console.log(newData);
        dataset.particles.push(newData);   // Push data to our array
        
        svg.selectAll("image")
            .data(dataset.particles)
            .enter().append('image')
            .attr('width', size)
            .attr('height', size)
            .attr(circleAttrs)
            .attr('id', "addingParticle")
            .attr('xlink:href', "/picture/whitestar.png")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", handleMouseClick);

        console.log('check log');
        $("div#PostForm").slideDown();
        $("a.PostFormClose").click(function() {
            $("div#PostForm").slideUp();
            d3.select("#" + "addingParticle").remove();
            svg.selectAll("image").remove();

            svg.selectAll("image")
                .data(old_dataset.particles)
                .enter().append('image')
                .attr('width', size)
                .attr('height', size)
                .attr(circleAttrs)
                .attr('xlink:href', "/picture/whitestar.png")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut)
                .on("click", handleMouseClick);

            dataset = JSON.parse(JSON.stringify(old_dataset));
        });
        /*
        $("svg").click(function() {
            $("div#PostForm").slideUp();
            d3.select("#" + "addingParticle").remove();
            svg.selectAll("image").remove();

            svg.selectAll("image")
                .data(old_dataset.particles)
                .enter().append('image')
                .attr('width', '15px')
                .attr('height', '15px')
                .attr(circleAttrs)
                .attr('xlink:href', "/picture/whitestar.png")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut)
                .on("click", handleMouseClick);

            dataset = JSON.parse(JSON.stringify(old_dataset));

        });*/

        $("form#Post").submit(function(event) {
            event.preventDefault();
            if ($("textarea#PostFormBox").val()==="") {
                console.log($("textarea#PostFormBox").val());
                return false; }
            else {
                jsondata = JSON.stringify({ author_id: fbUserID,
                    googleUserImage: googleUserImage,
                    context: $("textarea#PostFormBox").val(),
                    x: newData.x, y: newData.y });

                var ajaxresult = ajaxQuery(type="post", apiURL="/particle", jsondata);
                console.log(ajaxresult);
                if(!ajaxresult) {
                    $("div#PostForm").slideUp();
                    $("form").trigger("reset");
                    old_dataset = dataset;
                }
                else if(ajaxresult) {
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
$("svg").delay(5000).fadeIn(400);

// Create Event Handlers for mouse
function handleMouseOver(d, i) {  // Add interactivity

    // Use D3 to select element, change color and size
    d3.select(this)
        .attr('xlink:href', "/picture/yellowstar.png")

/*        
    // Specify where to put label of text
    svg.append("text").attr({
        //id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
        id: "t" + i,
        x: function() { return xScale(d.x) - 30; },
        y: function() { return yScale(d.y) - 15; }
    })
    .text(function() {
        return [d.x, d.y];  // Value of the text
    });
*/
    //tip.show();
    $("div#dummyDiv").show();
}

function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this)
      .attr("xlink:href", "/picture/whitestar.png")

    // Select text by id and then remove
    //d3.select("#t" + d.x + "-a" + d.y + "-" + i).remove();  // Remove text location
    //d3.select("#t" + i).remove();

    //tip.hide();
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
