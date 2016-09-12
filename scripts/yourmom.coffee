# Description
#   Your face is a hubot script. It replies with "your face"isms.
#
# Configuration:
#   HUBOT_YOURMOM_PERCENT (optional)
#		Percent chance that hubot will repond with a "Your face". Default is 40%
#
# Notes:
#   <optional notes required for the script>
#
# Author:
#   Joe Bott

module.exports = (robot) ->
	percent         = process.env.HUBOT_YOURMOM_PERCENT or 40

	lastYourFace = {}
	robot.hear /^([ \w]* )(is|was|has a|had a) ([ \w]+)[\.!]?$/, (message) ->
		lower = message.match[1].toLowerCase()
		if lower.indexOf("your mom") < 0 and lower.indexOf("how") < 0 and lower.indexOf("why") < 0 and lower.indexOf("wtf") < 0 and lower.indexOf("when") < 0 and lower.indexOf("where") < 0
			yourFace = "Your mom " + message.match[2] + " " + message.match[3]
			lastYourFace[(message.message.user.name + '').toLowerCase()] = yourFace
			if Math.random() <= (percent / 100.0)
				setTimeout (->
					message.send yourFace
					), 2000
		return

	robot.respond /how is (.*'s|my) mom\??$/i, (message) ->
		name = message.match[1].replace("'s", '')

		name = message.message.user.name + '' if message.match[1] == 'my'

		if lastYourFace[name.toLowerCase()]
			message.send name + ": " + lastYourFace[name.toLowerCase()]
		else
			message.send "I don't know how " + name + "'s mom is. :("
	
		return


