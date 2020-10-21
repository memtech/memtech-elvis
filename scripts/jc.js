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
  robot.respond(/jesus christ/ig, msg => msg.send(msg.random(responses)));
  const shame = new RegExp(`jesus christ @?${robot.name}`, "i");
  return robot.hear(shame, msg => msg.send(":fire: :pentagram: :fire:"));
};
