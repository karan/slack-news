var request = require('request');
var async = require('async');
var https = require('https');

var BASE_URL = 'https://news.ycombinator.com/';


module.exports = {

  aliases: ['hn', 'hackernews', 'hacker news'],

  pingAndSend: function (callback) {

    request('http://node-hnapi.herokuapp.com/news', function(err, response, items) {
      if (err || response.statusCode != 200) {
        return callback(err || 'Invalid query ['+ response.statusCode+'] — '+response.body+']');
      }

      items = JSON.parse(items);

      var botPayload = 'Current Hacker News homepage:\n'

      var index = 0;
      async.forEach(items, function(item, cb) {
        var url = item.url;
        if (item.url.indexOf('http') !== 0) {
          url = BASE_URL + item.url
        }

        botPayload += '<%url%|%rank%. %title%>\n'
                        .replace('%url%', url)
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
