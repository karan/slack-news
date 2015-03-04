var request = require('request');
var async = require('async');
var https = require('https');

var WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

module.exports = function (req, res, next) {

  request({
    url: 'https://api.producthunt.com/v1/posts',
    headers: {
      'Authorization': 'Bearer' + process.env.PH_TOKEN
    }
  }, function(err, response, items) {
    if (err || response.statusCode != 200) {
      return res.status(500).end();
    }

    items = JSON.parse(items).posts;

    var botPayload = 'Current Product Hunt homepage:\n'

    var index = 0;
    async.forEach(items, function(item, cb) {
      console.log(item);
      botPayload += '<%url%|%rank%. %title%>\n'
                      .replace('%url%', item.discussion_url)
                      .replace('%rank%', index + 1)
                      .replace('%title%', item.name);
      index++;
      cb();
    }, function(err) {

      console.log(payload);

      var payload = {
        text: botPayload,
        username: 'ProductHunt',
        channel: req.query.channel_id
      };

      request.post({
        url: WEBHOOK_URL,
        body: JSON.stringify(payload)

      }, function(err, resp, data) {
        if (err) {
          return res.status(500).end();
        }
      });
    });
  });
}
