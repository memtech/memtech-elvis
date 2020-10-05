/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

// Description:
//   Hubot responds any thank message politely. Phrases from:
//   http://www.macmillandictionary.com/thesaurus-category/british/Ways-of-accepting-someone-s-thanks
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot thank[s] [you] - Hubot accepts your thanks
//   thanks hubot - Hubot accepts your thanks
//
// Author:
//   github.com/delucas
//

const response = [
  "you're welcome",
  "no problem",
  "you're amazing",
  "you're the best",
  "not a problem",
  "no problem at all",
  "don’t mention it",
  "it’s no bother",
  "it’s my pleasure",
  "my pleasure",
  "it’s nothing",
  "think nothing of it",
  "no, no. thank you!",
  "sure thing"
];

module.exports = function(robot) {
  robot.respond(/thank(s| you)/i, msg => msg.send(msg.random(response)));
  const thanks = new RegExp(`thank(s| you) @?${robot.name}`, "i");
  return robot.hear(thanks, msg => msg.send(msg.random(response)));
};
