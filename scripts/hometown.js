// Description:
//   Show slack user's hometown from github.com/memtech/people
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   elvis hometown dpritchett - show slack user @dpritchett's home town on a map
//
// Author:
//   Daniel J. Pritchett <dpritchett@gmail.com>

module.exports = function(robot) {
  const JSON_SOURCE_URI = "https://raw.githubusercontent.com/memtech/people/gh-pages/js/locations.js";
  const REPO_URI = "https://github.com/memtech/people/blob/gh-pages/js/locations.js";
  const MAP_URI_BASE= "http://maps.google.com/maps?z=17&q=";

  const mapUri = user => `${MAP_URI_BASE}${user.latitude},${user.longitude}`;

  const checkCompany = function(company) {
    let companyString;
    if (company) {
      company = company.trim();
      companyString = `, and works at ${company}`;
    } else {
      companyString = "";
    }
    return companyString;
  };

  return robot.respond(/hometown @?(\w+)$/i, function(msg) {
    const username = msg.match[1];

    return msg.http(JSON_SOURCE_URI)
      .get()(function(err, res, body) {
        if (res.statusCode === 404) {
          return msg.send('Map URI not responding');
        } else {
          const hax = eval(body);

          for (let user of Array.from(locations)) {
            if (user.slack_handle === username) {
              return msg.send(`${user.name} hails from ${user.origin}${checkCompany(user.company)}! ${mapUri(user)}`);
            }
          }

          return msg.send(`User ${username} not found.  Make sure there's a \`slack_handle\` listed for this user at ${REPO_URI}`);
        }
    });
  });
};

