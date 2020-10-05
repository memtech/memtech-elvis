# testiness by
#
# - @dpritchett
# - your name here!?
#
_ = require('lodash')

module.exports = (robot) ->

  robot.assertMatchesAs = (pattern, str, expected) ->
    result = str.match(pattern)
    if _.isEqual(expected, result)
       robot.logger.debug "happy with #{str}"
     else
       robot.logger.error "\n\n****\t assertMatchesAs(#{pattern}, #{str}, #{expected}) failed. Actual result:"
       robot.logger.error result
       robot.logger.error "Goodbye."
       process.exit(1)

  robot.assertDoesNotMatch = (pattern, str) ->
    robot.assertMatchesAs(pattern, str, null)

  # self tests!
  canaryRegex = /canary/i
  robot.assertMatchesAs canaryRegex, "canary", ["canary"]
  robot.assertDoesNotMatch canaryRegex, "eagle"

  helloRegex = /hello (world|moon) (cow)/i
  robot.assertMatchesAs helloRegex, "hello World cow ", ["hello World cow", "World", "cow"]
