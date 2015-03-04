var request = require('request');
var async = require('async');
var https = require('https');

var config = require('./../config');


module.exports = {

  aliases: ['ph', 'producthunt', 'product hunt'],

  pingAndSend: function (callback) {

    request({
      url: 'https://api.producthunt.com/v1/posts',
      headers: {
        'Authorization': 'Bearer ' + config.PH_TOKEN
      }
    }, function(err, response, items) {
      if (err || response.statusCode != 200) {
        callback(err);
      }

      items = JSON.parse(items).posts;

      var botPayload = 'Current Product Hunt homepage:\n'

      var index = 0;
      async.forEach(items, function(item, cb) {
        botPayload += '<%url%|%rank%. %title%> (%tagline%)\n'
                        .replace('%url%', item.discussion_url)
                        .replace('%rank%', index + 1)
                        .replace('%title%', item.name)
                        .replace('%tagline%', item.tagline);
        index++;
        cb();
      }, function(err) {

        var payload = {
          text: botPayload,
          username: 'ProductHunt'
        };

        callback(null, payload);
      });
    });

  }

}
