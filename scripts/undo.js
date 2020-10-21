/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Description:
//   Having brought dishonor to it's family. Elvis will delete the last message sent, or the last [n] messages sent
//
// Dependencies:
//   "hubot-slack-utils": "0.0.5",
//
// Configuration:
//   None
//
// Commands:
//   elvis delete that
//   elvis delete 5
//
// Author:
//   github.com/Syliddar

module.exports = function(robot) {
  robot.respond(/delete that/i, function(msg){
    slack(delete last(1));
    return msg.send("Sorry about that.");
  });
  return robot.respond(/delete (\d)/i, function(msg) {
    const lines = msg.match[1];
    slack(delete last(lines));
    return msg.send("Sorry about that.");
  });
};