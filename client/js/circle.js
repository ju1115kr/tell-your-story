var canvas;

var radius = 12.8;
var lineWidth = 3;

var counterClockwise = false;

$("textarea#PostBox").on('change textInput input', function(e) {
  fillCircle($("textarea#PostBox").val().length, canvas)
});

$("textarea#ModifyBox").on('change textInput input', function(e) {
  fillCircle($("textarea#ModifyBox").val().length, canvas)
});

function fillCircle(text, canvas) {
  var context = canvas.getContext('2d');
  var x = canvas.width / 2;
  var y = canvas.height / 2;

  var startAngle = Math.PI * -0.5;
  var endAngle = startAngle + (text * (Math.PI * 2) / 280);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.arc(x, y, radius, 0, 0, counterClockwise);
  context.beginPath();
  context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
  context.lineWidth = lineWidth;

  context.strokeStyle = '#B0A9B5';
  if(text >= 240) {
    context.strokeStyle = '#331B3D';
  }
  context.stroke();
}
