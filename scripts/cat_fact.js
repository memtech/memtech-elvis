// Description:
//  Query https://catfact.ninja for cat facts
//
// Dependencies:
//  None
//
// Configuration:
//  None
//
// Commands:
//  elvis catfact - returns a random cat fact
//
// Author:
//  Xavier Tilley

module.exports = function (robot) {
  robot.respond(/catfact/i, function(msg) {
    return msg.http(`https://catfact.ninja/fact?max_length=140`)
      .get()(function(err, res, body) {
        if (err) {
          return msg.send(`The doggos stole the catfacts!`);
        } else {
          return msg.send(res.facts[0]);
        }
      });
  });
}
