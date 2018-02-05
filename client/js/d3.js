var w = window.innerWidth,
    h = window.innerHeight - 405,
//var w = $("body").width() * 1,
//    h = $("body").height() * 1.1,
    margin = { top: 40, right: 20, bottom: 20, left: 40 },
    radius = 6;

var svg = d3.select("div#stardustForm").append("svg").attr({
    width: w,
    height: h
});


var dataset = {"particles": [
    { x: 1000, y: 1100 },
    { x: 830, y: 430 },
    { x: 920, y: 280 },
    { x: 490, y: 740 },
    { x: 510, y: 100 },
    { x: 250, y: 980 },
    { x: 770, y: 300 },
    { x: 200, y: 830 },
    { x: 110, y: 630 },
    { x:  40, y: 550 },
    { x: 850, y: 1000 },
    { x: 600, y: 400 },
    { x: 700, y: 800 },
    { x: 100, y: 200 },
    { x: 400, y: 500 },
    { x: 250, y: 310 },
//    { x: 1000, y: 900 }
]};


//var dataset = ajaxQuery(type='get', apiURL='/particle');


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

svg.selectAll("image")
    .data(dataset.particles)
    .enter().append('image')
    .attr('width', '15px')
    .attr('height', '15px')
    .attr(circleAttrs)
    .attr('xlink:href', "/picture/whitestar.png")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("click", handleMouseClick);


    // On Click, we want to add data to the array and chart
svg.on("click", function() {
    if( $("div#PostForm").is(':visible') ){
        return false;
    }
    if( $("div#dummyDiv").is(':hidden') ){
        if(!fbLogin) {
            console.log("User doesn't login in fb");
            checkLoginState();
            return false;
        }

        var coords = d3.mouse(this);
        console.log(coords);

        var newData = {
            x: Math.round( xScale.invert(coords[0]) ),
            y: Math.round( yScale.invert(coords[1]) )
        };

        dataset.particles.push(newData);   // Push data to our array

        svg.selectAll("image")
            .data(dataset.particles)
            .enter().append('image')
            .attr('width', '15px')
            .attr('height', '15px')
            .attr(circleAttrs)
            .attr('id', "addingParticle")
            .attr('xlink:href', "/picture/whitestar.png")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", handleMouseClick);

        $("div#PostForm").slideDown();
        $("a.PostFormClose").click(function() {
            $("div#PostForm").slideUp();
            d3.select("#" + "addingParticle").remove();
        });

        $("form#Post").submit(function(event) {
            event.preventDefault();
            if ($("textarea#PostFormBox").val()==="") {
                console.log($("textarea#PostFormBox".val()));
                return false; }
            else {
                jsondata = JSON.stringify({ author_id:fbUserID,
                    context:$("textarea#PostFormBox").val(),
                    x: newData.x, y: newData.y });

                var ajaxresult = ajaxQuery(type="post", apiURL="/particle", dataset=jsondata);
                console.log(ajaxresult);
                if(!ajaxresult) {
                    $("div#PostForm").slideUp();
                    $("form").trigger("reset");
                }
                else if(!ajaxresult) {
                //error handling
                    console.log("ajaxresult doesn't not exist");
                    return false;
                }
            }
        });
    }

    else {
        //wrong request;
        return false;
    }
})

// Create Event Handlers for mouse
function handleMouseOver(d, i) {  // Add interactivity

    // Use D3 to select element, change color and size
    d3.select(this)
        .attr('xlink:href', "/picture/yellowstar.png")

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

    $("div#dummyDiv").show();
}

function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this)
      .attr("xlink:href", "/picture/whitestar.png")

    // Select text by id and then remove
    //d3.select("#t" + d.x + "-a" + d.y + "-" + i).remove();  // Remove text location
    d3.select("#t" + i).remove();

    $("div#dummyDiv").hide();
}

function handleMouseClick(d, i) {
  if ($("div#dummyDiv").is(':visible')){
    $('p.letterContext').text(d.x, d.y);
    $('div.letterForm').slideDown();
  }
  else {
    return false;
  }
}
