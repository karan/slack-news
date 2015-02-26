var request = require('request');
var async = require('async');
var https = require('https');

var WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

module.exports = function (req, res, next) {

  request('http://node-hnapi.herokuapp.com/news', function(err, response, items) {
    if (err || response.statusCode != 200) {
      return res.status(500).end();
    }

    items = JSON.parse(items);

    var botPayload = 'Current Hacker News homepage:\n'

    var index = 0;
    async.forEach(items, function(item, cb) {
      botPayload += '<%url%|%rank%. %title%>\n'
                      .replace('%url%', item.url)
                      .replace('%rank%', index + 1)
                      .replace('%title%', item.title);
      index++;
      cb();
    }, function(err) {

      var payload = {
        text: botPayload,
        username: 'HackerNews',
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
