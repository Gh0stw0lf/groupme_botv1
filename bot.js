var HTTPS = require('https');
var date = require('./datemodule');

var botID = process.env.BOT_ID;

var aboutbotto = "Hi! My name is botto. I heard my name mentioned so I just thought I'd say Hi. I can't do much yet, I can tell the time, identify memes, but I'm working hard on learning. Go Coogs!"

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /what time is it/i; AboutBottoRegex = /botto/i;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } 
  else if(request.text && AboutBottoRegex.test(request.text)) {
  	this.res.writeHead(200);
  	postMessage(aboutbottomsg());
  	this.res.end()
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = date.myDateTime();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };
  function aboutbottomsg() {
  	return aboutbotto
  }

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