# Description:
#   None
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   over 9000 - Display Vegata destroying scouter
#
# Author:
#   mattm

powerlevel = "https://media.giphy.com/media/fijRLk7GeRsVa/giphy.gif"

module.exports = (robot) ->
  robot.respond /what[']?s the power level/i, (msg) ->
    msg.send powerlevel
