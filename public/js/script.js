


console.log("Loading script.js")


//var socket = io.connect('http://localhost');
var socket = io.connect(window.location.hostname);

$('button').click(function () {
  //console.log("Button has been clicked!")
  var number = $('#numberInput').val();
  var text = $('#messageInput').val();
  var sendTime = $('#sendTime').val();
  var sendDate = $('#sendDate').val();
  var dateAndTime = sendDate+"T"+sendTime+"-05:00";
  //console.log(dateAndTime);
  socket.emit('messageEvent',{'number': number, 'text': text, 'dateAndTime': dateAndTime});
  clickFeedback();
  $('#messageInput').val('');
});

function clickFeedback(){
	$('#message-icon').fadeIn(100);
	$('#message-icon').animate({'left': '148px'}, 800);
	$('#message-icon').fadeOut(100);
	$('#message-icon').css({'left': '0px'});
}




