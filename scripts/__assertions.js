// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// testiness by
//
// - @dpritchett
// - your name here!?
//
const _ = require('lodash');

module.exports = function(robot) {

  robot.assertMatchesAs = function(pattern, str, expected) {
    const result = str.match(pattern);
    if (_.isEqual(expected, result)) {
       return robot.logger.debug(`happy with ${str}`);
     } else {
       robot.logger.error(`\n\n****\t assertMatchesAs(${pattern}, ${str}, ${expected}) failed. Actual result:`);
       robot.logger.error(result);
       robot.logger.error("Goodbye.");
       return process.exit(1);
     }
  };

  robot.assertDoesNotMatch = (pattern, str) => robot.assertMatchesAs(pattern, str, null);

  // self tests!
  const canaryRegex = /canary/i;
  robot.assertMatchesAs(canaryRegex, "canary", ["canary"]);
  robot.assertDoesNotMatch(canaryRegex, "eagle");

  const helloRegex = /hello (world|moon) (cow)/i;
  return robot.assertMatchesAs(helloRegex, "hello World cow ", ["hello World cow", "World", "cow"]);
};
