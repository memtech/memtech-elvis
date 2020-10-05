/* eslint-disable
    no-useless-escape,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

// Description:
//   Hubot feels shame for his actions
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot
//
// Author:
//   github.com/syliddar
//


const responses = ["Whoops",
  "My bad",
  "¯\_(ツ)_/¯",
  ":(",
  "I'm sorry.",
  "Sorry",
  "Soz",
  ":stuck_out_tongue:",
  ":no_mouth:",
  "Sorry, I'll try harder next time.",
  "sorrynotsorry",
  ":fire:",
  ":umad:",
  ":rageface:",
  ":troll:",
  ":trollgold:",
  ":joshin:"
];

module.exports = function(robot) {
  robot.respond(/gdi|wtf|damnit|dammit|you suck|no|fuck you|god damn|damn/ig, msg => msg.send(msg.random(responses)));
  const shame = new RegExp(`(gdi|wtf|damnit|dammit|you suck|no|fuck you|god damn|damn) @?${robot.name}`, "i");
  return robot.hear(shame, msg => msg.send(msg.random(responses)));
};
