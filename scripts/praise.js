
# Description:
#   Hubot graciously accepts praise for his actions
#   http://www.macmillandictionary.com/thesaurus-category/british/Ways-of-accepting-someone-s-thanks
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot (gg | well done | good job | atta boy ) - Hubot accepts your praise
#   (gg | well done[,] | good job[,] | atta boy[,]) hubot - Hubot accepts your praise
#
# Author:
#   github.com/unstablereality
#

response = [
  "Thank you!",
  "You're too kind.",
  "It was pretty good, wasn't it?",
  "I couldn't have done it without you.",
  "Happy to help!",
  "It's nice to be appreciated.",
  "I was feeling really down today, and this is just the encouragement I need to keep going.",
  "I don't always play games, but when I do, I play them well."
]

module.exports = (robot) ->
  robot.respond /gg|ggwp|wp|well played|well done|good job|atta boy|i love you/i, (msg) ->
        msg.send msg.random response
      thanks = new RegExp "(gg|ggwp|wp|well played(,|)|well done(,|)|good job(,|)|atta boy(,|)|i love you(,|)) @?#{robot.name}", "i"
      robot.hear thanks, (msg) ->
          msg.send msg.random response
