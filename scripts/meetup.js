// Description:
//   Memphis Technology User Groups Meetup Search
//
// Dependencies:
//   None
//
// Commands:
//   meetup|event $search_terms - Display information for the next meetup matching the $search_terms
//   link meetup|event $search_terms - Get a permanent url for the next meetup matching $search_tems
//
// Author:
//   dpritchett
//   joshwlewis


const base_url     = "http://meetups.memphistechnology.org/";

const moment   = require('moment');

module.exports = function(robot) {

  robot.respond(/link (event|meetup) (.*)/i, function(msg) {
    const link = base_url + msg.match[2];
    msg.send(link);
    return robot.tweet(link);
  });

  return robot.respond(/(event|meetup)(.*)/i, function(msg) {
    const keyword = msg.match[2].trim();

    return msg.http(`${base_url}/calendar.json`)
      .query({keyword})
      .get()(function(err, res, body) {
        if (err) {
          return msg.send(`Calendar API error: ${err}`);
        } else {
          // Filter out any meetups that happened prior to today.
          const today = new Date();
          const meetups = [
            (() => {
            const result = [];
            for (let m of Array.from(JSON.parse(body).meetups)) {               if (today < new Date(m.time)) {
                result.push(m);
              }
            }
            return result;
          })()
          ][0];

          if (meetups.length > 0) {
            const meetup = meetups[0];
            const time = new Date(meetup.time);
            const humanTime = moment(time).calendar();
            let resp = `${meetup.name}: ${humanTime} `;
            if (meetup.venue != null) { resp += `@${meetup.venue.name} `; }

            // provide generic meetup link if no keywords were supplied
            if (!!keyword.length) {
              resp += `(${base_url}${escape(keyword)})`;
            } else {
              resp += `(${meetup.event_url})`;
            }

            msg.send(resp);
            return robot.tweet(resp);
          } else {
            return msg.send(`Sorry, I couldn't find a meetup matching ${keyword}.`);
          }
        }
    });
  });
};
