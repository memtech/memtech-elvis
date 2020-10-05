
# Description:
#   Hubot feels shame for his actions
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot
#
# Author:
#   github.com/syliddar
#


responses = ["Whoops",
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
]

module.exports = (robot) ->
  robot.respond /gdi|wtf|damnit|dammit|you suck|no|fuck you|god damn|damn/ig, (msg) ->
    msg.send msg.random responses
  shame = new RegExp "(gdi|wtf|damnit|dammit|you suck|no|fuck you|god damn|damn) @?#{robot.name}", "i"
  robot.hear shame, (msg) ->
    msg.send msg.random responses
