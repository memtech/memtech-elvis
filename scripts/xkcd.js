/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Description:
//   Grab XKCD comic image urls
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot xkcd [latest]- The latest XKCD comic
//   hubot xkcd <num> - XKCD comic <num>
//   hubot xkcd random - XKCD comic <num>
//
// Author:
//   twe4ked
//   Hemanth (fixed the max issue)

module.exports = function(robot) {
  const prune = text => text.replace(/\s+/g, ' ').substr(0,400);

  robot.respond(/xkcd(\s+latest)?$/i, msg => msg.http("https://xkcd.com/info.0.json")
    .get()(function(err, res, body) {
      if (res.statusCode === 404) {
        return msg.send('Comic not found.');
      } else {
        const object = JSON.parse(body);
        return msg.send(prune([object.title, object.img, object.alt].join(' ')));
      }
  }));

  robot.respond(/xkcd\s+(\d+)/i, function(msg) {
    const num = `${msg.match[1]}`;

    return msg.http(`https://xkcd.com/${num}/info.0.json`)
      .get()(function(err, res, body) {
        if (res.statusCode === 404) {
          return msg.send('Comic #{num} not found.');
        } else {
          const object = JSON.parse(body);
          return msg.send(prune([object.title, object.img, object.alt].join(' ')));
        }
    });
  });

  return robot.respond(/xkcd\s+random/i, msg => msg.http("https://xkcd.com/info.0.json")
        .get()(function(err,res,body) {
          let max;
          if (res.statusCode === 404) {
             return max = 0;
          } else {
             max = JSON.parse(body).num; 
             const num = Math.floor((Math.random()*max)+1);
             return msg.http(`http://xkcd.com/${num}/info.0.json`)
             .get()(function(err, res, body) {
               const object = JSON.parse(body);
               return msg.send(prune([object.title, object.img, object.alt].join(' ')));
             });
           }
  }));
};
