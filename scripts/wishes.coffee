# Description:
#   A handy little hubot script that grants wishes to anyone who can collect all 7 Dragon Balls
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot I wish <text> - The dragon will grant your wish if you've collected all the dragon balls

#Collect a random number of balls
#20% chance of getting all 7!
collectBalls = ->
  checkEm = Math.floor(Math.random() * 5) + 1 #rando between 1 and 2
  balls = 0

  #here's that 20% chance to win part
  if (checkEm > 4)
    balls = 7
  else
    balls = Math.floor(Math.random() * 6) + 1 #losers get a rando between 1 and 6

  balls
  
  #Place Dragon Ball emojis in a container of some sort
#Give me your number and I'll give you a string
sackBalls = (count) ->
  ballsEmojis = ""

  ballsEmojis += ":db" + i + ": " for i in [1 .. count]

  ballsEmojis;


#Tell me how many balls you got and I'll give you a snarky response
fusRoDah = (count) ->

  rando = Math.floor(Math.random() * 3)
  response = ""
  failWhale = [
    "that sucks, you need like ballCount more dragon ballz",
    "sorry, but yer gonna need ballCount more dbz",
    "oooohhh, bummer... looks like you need ballCount more ballz"
  ]
  successBaby = [
    "It looks like you've got all the dragon ballz there so I don't see why not. Wish granted.",
    "You got balls kid. Wish granted",
    "Wish granted. Our hero is still dead. I hope you're happy."
  ]

  if count == 7
    response = successBaby[rando]
  else
    response = failWhale[rando]

    if 7 - count == 1
      #todo trim z from end of string
      response = response.slice(0, -1);

    #todo string replace number of balls
    response = response.replace( /ballCount/, 7 - count )

  response

grantWish = ->
  balls = collectBalls()      #how many balls are we working with here?
  ballSack = sackBalls(balls) #emoji string
  response = fusRoDah(balls)  #what does the dragon say? (ring ding ding...)
  wish = ""

  wish += ballSack
  wish += "\n"
  wish += ":dragon: "
  wish += response

  wish

module.exports = (robot) ->
  robot.respond /I wish/i, (msg) ->
    msg.emote grantWish()
