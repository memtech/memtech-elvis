// Description:
//   A handy little hubot script that lets hubot gives you "Quality" advice
//
// Author:
//	Syliddar
//
// Commands:
//   hubot should (X)
//	hubot can (X)
//	hubot will (X)

const should = [	
	"Without a doubt",
	"Yes, definitely",	
	"Yes",
	"Signs point to yes",
	"Reply hazy try again",
	"Ask again later",
	"Better not tell you now",
	"Don't count on it",
	"My reply is no",
	"Absolutely not",
	"My sources say no"	
];

const will =[
	"Cannot predict now",	
	"As I see it, yes",
	"Most likely",
	"Outlook good",
	"You may rely on it",
	"It is certain",
	"It is decidedly so",
	"Signs point to yes",
	"Outlook not so good",
	"Very doubtful"
];

const can =[
	"Cannot predict now",	
	"As I see it, yes",
	"Signs point to yes",
	"Most likely",
	"Outlook good",
	"You may rely on it",
	"It is certain",
	"Signs point to yes",
	"Yes",
	"My reply is no",
	"My sources say no",
	"Absolutely not",
	"Outlook not so good",
	"Very doubtful"	
];


module.exports = function(robot) {
	robot.respond(/\bshould\b/i, msg => msg.send(msg.random(should)));
	robot.respond(/\bwill\b/i, msg => msg.send(msg.random(will)));
	return robot.respond(/\bcan\b/i, msg => msg.send(msg.random(can)));
};