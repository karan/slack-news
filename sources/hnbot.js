var request = require('request');
var async = require('async');
var https = require('https');


module.exports = {

  aliases: ['hn', 'hackernews', 'hacker news'],

  pingAndSend: function (callback) {

    request('http://node-hnapi.herokuapp.com/news', function(err, response, items) {
      if (err || response.statusCode != 200) {
        callback(err);
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
          username: 'HackerNews'
        };

        callback(null, payload);
      });
    });

  }

}
