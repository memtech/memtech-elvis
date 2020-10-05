/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Description:
//   Image Macro Responder
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   anything!
//
// Author:
//   dpritchett
//   svpernova09
//   basedgeek
//   bkmontgomery

module.exports = function(robot) {
  //##############################
  // convenience machinery
  //##############################

  const DEFAULT_CHANCE_TO_SKIP = 50;

  const messageIsDirect = msg => msg.message.text.match(new RegExp(robot.name, 'i'));

  //#####################################
  // Actual listeners
  //#####################################

  // register a 'respond' listener that always respond to direct input.
  robot.registerResponder = function(args) {

    const respondAlways = function(msg) {
      // direct commands are already handled by respondAlways
      if (args.note != null) {
        return msg.send([args.note, msg.random(args.responses)].join(' '));
      } else {
        return msg.send(msg.random(args.responses));
      }
    };

    return Array.from(args.triggers).map((trigger) =>
      robot.respond(trigger, respondAlways));
  };

  robot.registerHelpfulResponder = function(args) {
    args.chanceToSkip = 100;
    return robot.registerResponder(args);
  };

  return robot.emit("register-responder-loaded");
};
