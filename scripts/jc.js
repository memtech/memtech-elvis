
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
  robot.respond /jesus christ/ig, (msg) ->
    msg.send msg.random responses
  shame = new RegExp "jesus christ @?#{robot.name}", "i"
  robot.hear shame, (msg) ->
    msg.send ":fire: :pentagram: :fire:"
