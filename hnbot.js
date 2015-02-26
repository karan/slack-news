var request = require('request');
var async = require('async');

module.exports = function (req, res, next) {

  var POST_LIMIT = 20;

  request('http://node-hnapi.herokuapp.com/news', function(err, response, items) {
    if (err || response.statusCode != 200) {
      return res.status(500).end();
    }

    items = JSON.parse(items);

    var botPayload = '*Current Hacker News homepage:*\n'

    var index = 0;
    async.forEach(items, function(item, cb) {
      botPayload += '<%url%|%rank%. %title%>\n'
                      .replace('%url%', item.url)
                      .replace('%rank%', index + 1)
                      .replace('%title%', item.title);
      index++;
      cb();
    }, function(err) {
      return res.status(200).send(JSON.stringify({
        'text': botPayload,
        'username': 'slackbot',
        'mrkdwn': true
      }));
    });
  });
}
