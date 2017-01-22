# Description:
# Hubot feels shame for his actions
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

responses =
["Whoops",
"My bad",
"I'll try harder next time.",
"sorrynotsorry",
":fire:",
":umad:",
":rageface:",
":troll:",
":trollgold:",
":joshin:"
]

module.exports = (robot) ->
robot.respond /gdi|wtf|damnit|you suck|no|fuck you|god damn|damn/ig, (msg) ->
msg.send msg.random responses
shame = new RegExp "(gdi|wtf|you suck|no|fuck you|damn) @?#{robot.name}", "i"
robot.hear thanks, (msg) ->
msg.send msg.random responses