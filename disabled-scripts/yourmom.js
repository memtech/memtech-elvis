/* eslint-disable
    no-useless-escape,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Description
//   Your face is a hubot script. It replies with "your face"isms.
//
// Configuration:
//   HUBOT_YOURMOM_PERCENT (optional)
//		Percent chance that hubot will repond with a "Your face". Default is 40%
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Joe Bott

module.exports = function(robot) {
	const percent         = process.env.HUBOT_YOURMOM_PERCENT || 40;

	const lastYourFace = {};
	robot.hear(/^([ \w]* )(is|was|has a|had a|looks|looks like|looked like) ([ \w]+)[\.!]?$/, function(message) {
		const lower = message.match[1].toLowerCase();
		if ((lower.indexOf("your mom") < 0) && (lower.indexOf("how") < 0) && (lower.indexOf("why") < 0) && (lower.indexOf("wtf") < 0) && (lower.indexOf("when") < 0) && (lower.indexOf("where") < 0)) {
			const yourFace = "Your mom " + message.match[2] + " " + message.match[3];
			lastYourFace[(message.message.user.name + '').toLowerCase()] = yourFace;
			if (Math.random() <= (percent / 100.0)) {
				setTimeout((() => message.send(yourFace)), 2000);
			}
		}
	});

	return robot.respond(/how is (.*'s|my) mom\??$/i, function(message) {
		let name = message.match[1].replace("'s", '');

		if (message.match[1] === 'my') { name = message.message.user.name + ''; }

		if (lastYourFace[name.toLowerCase()]) {
			message.send(name + ": " + lastYourFace[name.toLowerCase()]);
		} else {
			message.send("I don't know how " + name + "'s mom is. :(");
		}
	
	});
};


