var http = require('http');
var path = require('path');
var express = require('express');
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


var accountSid = 'ACde96f33e566f46911501ac3156279acc';
var authToken = "1473dfd7e79a626c0252613616845dd4";
var client = require('twilio')(accountSid, authToken);
var cronJob = require('cron').CronJob;
//var schedule = require('node-schedule');


server.listen(5000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response){
	response.sendfile(__dirname + "/views/index.html");
});

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

/*var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});*/

io.sockets.on('connection', function(client){
	console.log('Client connected');
	client.on('messageEvent', function(data){
		sendFutureMessage(data.number, data.text, data.dateAndTime);
	});
});


function sendMessage2(){
	client.sms.messages.create({
	    body: "Hi",
	    to: "+15133124062",
	    from: "+18594467648"
	}, function(err, message) {
	    process.stdout.write(message.sid);
	});
}




function sendMessage(num, msg){
	console.log(num+", "+msg);
	client.sms.messages.create({
	    body: msg,
	    to: "+1"+num,
	    from: "+18594467648"
	}, function(err, message) {
	    process.stdout.write(message.sid);
	});
}

/*function sendFutureMessage(num, msg){
	var date = new Date(2014, 1, 2, 2, 03, 0);
	var j = schedule.scheduleJob(date, sendMessage(num,msg));
}*/

function sendFutureMessage(num, msg, dateAndTime){
	//var date = new Date(2014, 0, 2, 2, 30, 0);
	var date = new Date(dateAndTime);
	console.log(dateAndTime);
	console.log(date);
	var job = new cronJob(date, function(){
    	sendMessage(num, msg);
  	}, function () {},
  	true /* Start the job right now */,
  	'US/Eastern' /* Time zone of this job. */
	);
}