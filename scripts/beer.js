// Description:
//   Hubot returns the status of @Syliddar's latest beer
//
// Dependencies:
//   "moment": "2.8.3",
//
// Configuration:
//   None
//
// Commands:
//   hubot beerstatus
//
// Author:
//   github.com/Syliddar
const moment = require('moment');

module.exports = function(robot) {
  const humanDate = dateStamp => moment(dateStamp).calendar();
  return robot.respond(/(beer status)|(@Syliddar beer status)|(how's my beer)|(how's @Syliddar's beer)|(how is my beer)|(how is @Syiliddar's beer)/i, msg => msg.http("https://beer.jmyers.tech").get()(function(err, res, body) {
    if (res.statusCode !== 200) {
      return msg.send("No response. Maybe @Syliddar should fix his beer site.");
    } else {
      const object = JSON.parse(body);
      return msg.send(`Latest sensor data for ${data.beer_name}. SG: ${data.sg}; Temp: ${data.temp}; Sensor reading taken on ${humanDate(data.time)}`);
    }
  }));
};