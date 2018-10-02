var HTTPS = require('https');
var date = require('./datemodule');

var botID = process.env.BOT_ID;

var aboutbotto = "Hi! I heard my name mentioned so I just thought I'd say Hi. I can't do much yet, I can tell the time, identify memes, but I'm working hard on learning. Go Coogs!"
var footballmsg = "YA WOO COUGAR FOOTBALL!"


function aboutbottomsg() {
  	return aboutbotto
  }

function football() {
	return footballmsg
}

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /what time is it/i; AboutBottoRegex = /botto/i; footballregex = /football/i;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(date);
    this.res.end();
  } 
  else if(request.text && AboutBottoRegex.test(request.text)) {
  	this.res.writeHead(200);
  	postMessage(aboutbottomsg());
  	this.res.end()
  }
  else if(request.text && footballregex.test(request.text)) {
  	this.res.writeHead(200);
  	postMessage(football());
  	this.res.end()
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse, options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };


  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;