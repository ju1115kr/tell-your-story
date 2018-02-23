var canvas = document.getElementById('circle');
var context = canvas.getContext('2d');

var x = canvas.width / 2;
var y = canvas.height / 2;
var radius = 12.8;
var lineWidth = 3;

//if( $(window).innerWidth <= 980 ) { radius = 22; lineWidth = 5;}
var counterClockwise = false;

$("textarea#PostBox").on('change textInput input', function(e) {
    fillCircle($("textarea").val().length)
});

function fillCircle(text) {
    var startAngle = Math.PI * -0.5;
    var endAngle = startAngle + (text * (Math.PI * 2) / 280);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.arc(x, y, radius, 0, 0, counterClockwise);
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = lineWidth;

    context.strokeStyle = '#B0A9B5';
    if(text >= 240) {
        context.strokeStyle = 'pink';
    }
//    context.strokeStyle = '#B3ABBA';
//    context.strokeStyle = 'white';
    context.stroke();
}
