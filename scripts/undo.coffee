# Description:
#   Having brought dishonor to it's family. Elvis will delete the last message sent, or the last [n] messages sent
#
# Dependencies:
#   "hubot-slack-utils": "0.0.5",
#
# Configuration:
#   None
#
# Commands:
#   elvis delete that
#   elvis delete 5
#
# Author:
#   github.com/Syliddar

module.exports = (robot) ->
  robot.respond /(delete that)/i, (msg)->
    slack delete last 1
    msg.send "Sorry about that."
  robot.respond /(delete \d)/i, (msg) ->
    lines = msg.match[1]
    slack delete last lines
    msg.send "Sorry about that."