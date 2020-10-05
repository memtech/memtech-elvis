// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Description:
//   Generates memes via the Imgflip Meme Generator API
//
// Dependencies:
//   None
//
// Configuration:
//   IMGFLIP_API_USERNAME [optional, overrides default imgflip_hubot account]
//   IMGFLIP_API_PASSWORD [optional, overrides default imgflip_hubot account]
//
// Commands:
//   hubot One does not simply <text> - Lord of the Rings Boromir
//   hubot I don't always <text> but when i do <text> - The Most Interesting man in the World
//   hubot aliens <text> - Ancient Aliens History Channel Guy
//   hubot grumpy cat <text> - Grumpy Cat with text on the bottom
//   hubot <text>, <text> everywhere - X, X Everywhere (Buzz and Woody from Toy Story)
//   hubot Not sure if <text> or <text> - Futurama Fry
//   hubot Y U NO <text> - Y U NO Guy
//   hubot Brace yourselves <text> - Brace Yourselves X is Coming (Imminent Ned, Game of Thrones)
//   hubot <text> all the <text> - X all the Y
//   hubot <text> that would be great - Bill Lumbergh from Office Space
//   hubot <text> too damn <text> - The rent is too damn high
//   hubot Yo dawg <text> so <text> - Yo Dawg Heard You (Xzibit)
//   hubot <text> you're gonna have a bad time - Super Cool Ski Instructor from South Park
//   hubot Am I the only one around here <text> - The Big Lebowski
//   hubot What if I told you <text> - Matrix Morpheus
//   hubot <text> ain't nobody got time for that
//   hubot <text> I guarantee it - George Zimmer
//   hubot <text> and it's gone - South Park Banker Guy
//   hubot <text> nobody bats an eye <text> everyone loses their minds - Heath Ledger Joker
//   hubot back in my day <text> - Grumpy old man
//   hubot Do you want <text>? Because that's how you get <text> - Archer
//   hubot say <text> one more goddamn time <text> - Jules Winnfield
//   hubot <text> Fuck Me Right - superbad
//   hubot <text> But that's none of my business - Kermit
//   hubot <text> WTF jackie chan
//   hubot <text> that's what I call takin' care of business - The King
//   hubot It look like a <text> to me everybody seen the <text> say yeah - Leprechaun guy
//   hubot Your <text> and you should feel <text> - Zoidberg
//   hubot One <text> please - Zoidberg
//   hubot Everyone's <text> And I'm just sitting here <text> - Spiderman
//   hubot confusedgandalf <text> Confused Gandalf
//   hubot eagle <text> Patriotic Eagle
//   hubot show me a hipster - Hipster?
//   hubot got any more of them <text>? - Tyrone Biggums
//
// Author:
//   dylanwenzlau


const {
  inspect
} = require('util');

module.exports = function(robot) {
  if (robot.brain.data.imgflip_memes == null) {
    robot.brain.data.imgflip_memes = [
      {
        regex: /(one does not simply) (.*)/i,
        template_id: 61579
      },
      {
        regex: /(i don'?t always .*) (but when i do,? .*)/i,
        template_id: 61532
      },
      {
        regex: /aliens ()(.*)/i,
        template_id: 101470
      },
      {
        regex: /(show me a hipster)/i,
        template_id: 77139950
      },
      {
        regex: /grumpy cat ()(.*)/i,
        template_id: 405658
      },
      {
        regex: /(.*),? (\1 everywhere)/i,
        template_id: 347390
      },
      {
        regex: /(not sure if .*) (or .*)/i,
        template_id: 61520
      },
      {
        regex: /(y u no) (.+)/i,
        template_id: 61527
      },
      {
        regex: /(brace yoursel[^\s]+) (.*)/i,
        template_id: 61546
      },
      {
        regex: /(.*) (all the .*)/i,
        template_id: 61533
      },
      {
        regex: /(.*) (that would be great|that'?d be great)/i,
        template_id: 563423
      },
      {
        regex: /(.*) (\w+\stoo damn .*)/i,
        template_id: 61580
      },
      {
        regex: /(yo dawg .*) (so .*)/i,
        template_id: 101716
      },
      {
        regex: /(.*) (.* gonna have a bad time)/i,
        template_id: 100951
      },
      {
        regex: /(am i the only one around here) (.*)/i,
        template_id: 259680
      },
      {
        regex: /(what if i told you) (.*)/i,
        template_id: 100947
      },
      {
        regex: /(.*) (ain'?t nobody got time for? that)/i,
        template_id: 442575
      },
      {
        regex: /(.*) (i guarantee it)/i,
        template_id: 10672255
      },
      {
        regex: /(.*) (a+n+d+ it'?s gone)/i,
        template_id: 766986
      },
      {
        regex: /(.* bats an eye) (.* loses their minds?)/i,
        template_id: 1790995
      },
      {
        regex: /(back in my day) (.*)/i,
        template_id: 718432
      },
      {
        regex: /(do you want .*) (because that's how you get .*)/i,
        template_id: 10628640
      },
      {
        regex: /(say .* one more goddamn time)(.*)/i,
        template_id: 124212
      },
      {
        regex: /(.*)(fuck me right)/i,
        template_id: 2182291
      },
      {
        regex: /(.*)(but that's none of my business)/i,
        template_id: 16464531
      },
      {
        regex: /(.*)(WTF)/i,
        template_id: 412211
      },
      {
        regex: /(.*)(that's what I call takin' care of business)/i,
        template_id: 15339516
      },
      {
        regex: /(it look like a .* to me) (everybody seen the .* say yeah)/i,
        template_id: 18559958
      },
      {
        regex: /(your .*) (and you should feel .*)/i,
        template_id: 8353902
      },
      {
        regex: /(.*)(one .* please)/i,
        template_id: 14820661
      },
      {
        regex: /(everybody's .*) (and i'm just sitting here .*)/i,
        template_id: 1705097
      },
      {
        regex: /(.* is the way to go)/i,
        line2After: "call 683-7000",
        template_id: 22783973
      },
      {
        regex: /(i should buy .*)/i,
        template_id: 1367068
      },
      {
        regex: /boatcat ()(.*)/i,
        template_id: 1367068
      },
      {
        regex: /(you're tearing me apart)(.*)/i,
        template_id: 23069326
      },
      {
        regex: /rogers ()(.*)/i,
        template_id: 23577483
      },
      {
        regex: /correction (.*)()/i,
        template_id: 23744546
      },
      {
        regex: /confusedgandalf ()(.*)/i,
        template_id: 25857549
      },
      {
        regex: /eagle(.*)/i,
        template_id: 126770
      },
      {
        regex: /(got any more of them) (.*)/i,
        template_id: 13424299
      },
    ];
  }

  return Array.from(robot.brain.data.imgflip_memes).map((meme) =>
    setupResponder(robot, meme));
};

var setupResponder = (robot, meme) => robot.respond(meme.regex, msg => generateMeme(msg, meme.template_id,
  [meme.line1Before, msg.match[1], meme.line1After].join(' ').trim(),
  [meme.line2Before, msg.match[2], meme.line2After].join(' ').trim()));

var generateMeme = function(msg, template_id, text0, text1) {
  const username = process.env.IMGFLIP_API_USERNAME;
  const password = process.env.IMGFLIP_API_PASSWORD;

  if ((username || password) && !(username && password)) {
    msg.reply('To use your own Imgflip account, you need to specify username and password!');
    return;
  }

  return msg.http('https://api.imgflip.com/caption_image')
  .query({
      template_id,
      username,
      password,
      text0,
      text1}).post()(function(error, res, body) {
    if (error) {
      msg.reply("I got an error when talking to imgflip:", inspect(error));
      return;
    }

    const result = JSON.parse(body);
    const {
      success
    } = result;
    const errorMessage = result.error_message;

    if (!success) {
      msg.reply(`Imgflip API request failed: ${errorMessage}`);
      return;
    }

    return msg.send(result.data.url);
  });
};
