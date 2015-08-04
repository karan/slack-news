var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var hnbot = require('./sources/hnbot');
var phbot = require('./sources/phbot');

var config = require('./config');
 
var app = express();
var port = process.env.PORT || 3000;

 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!') });


app.get('/news', function(req, res, next) {
  var query = req.query.text ? req.query.text.toLowerCase() : null;

  var bot = hnbot;

  if (phbot.aliases.indexOf(query) > -1) {
    bot = phbot;
  }

  bot.pingAndSend(function(err, payload) {

    if (err) {
      return res.status(500).end();
    }

    payload.channel = req.query.channel_id;
    payload.icon_url = 'http://i.imgur.com/YaC3BuK.jpg';
    
    request.post({
      url: config.SLACK_WEBHOOK_URL,
      body: JSON.stringify(payload)

    }, function(err, resp, data) {
      if (err) {
        return res.status(500).end();
      }
    });
  });

});
 
// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});
 
app.listen(port, function () {
  console.log('Slack News bot listening on port ' + port);
});
