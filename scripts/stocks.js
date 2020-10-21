// Description:
//   Grab stock information from Yahoo! Finance
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot stocks <ticker> - Return stock price for <ticker>
//
// Author:
//   Daniel Soskel

module.exports = robot => robot.respond(/stocks\s+(\w+)/i, function(msg) {
  const ticker = `${msg.match[1]}`;

  return msg.http(`http://download.finance.yahoo.com/d/quotes.csv?s=${ticker}&f=l1`)
    .get()(function(err, res, body) {
      if (res.statusCode === 404) {
        return msg.send("Stock not found or could not contact :yahoo: Finance.");
      } else {
        return msg.send(`${ticker}: $${body}`);
      }
  });
});
