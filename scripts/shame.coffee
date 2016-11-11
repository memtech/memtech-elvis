
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

criticism = [
  "Whoops",
  "My bad",
  "I'll try harder next time.",

]

anger = [
	":fire:",
	":umad:",
	":rageface:",
	
]

module.exports = (robot) ->
	robot.respond /gdi(,|)|wtf(,|)|damnit(,|)|you suck(,|)|you suck(,|)|(,|)no|fuck you(,|)/ig, (msg) ->
		msg.send msg.random response
    
	thanks = new RegExp "(gg|well done(,|)|good job(,|)atta boy(,|)) @?#{robot.name}", "i"
    
	robot.hear thanks, (msg) ->
		.send msg.random response
