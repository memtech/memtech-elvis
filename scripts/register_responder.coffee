# Description:
#   Image Macro Responder
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   anything!
#
# Author:
#   dpritchett
#   svpernova09
#   basedgeek
#   bkmontgomery

module.exports = (robot) ->
  ###############################
  # convenience machinery
  ###############################

  DEFAULT_CHANCE_TO_SKIP = 50

  messageIsDirect = (msg) ->
    msg.message.text.match(new RegExp(robot.name, 'i'))

  ######################################
  # Actual listeners
  ######################################

  # register a 'respond' listener that always respond to direct input.
  robot.registerResponder = (args) ->

    respondAlways = (msg) ->
      # direct commands are already handled by respondAlways
      if args.note?
        msg.send [args.note, msg.random(args.responses)].join(' ')
      else
        msg.send msg.random(args.responses)

    for trigger in args.triggers
      robot.respond trigger, respondAlways

  robot.registerHelpfulResponder = (args) ->
    args.chanceToSkip = 100
    robot.registerResponder args

  robot.emit "register-responder-loaded"
