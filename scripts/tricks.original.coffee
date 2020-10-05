# Description:
#   Who says you can't teach an old hound dog new tricks?
#   Elvis will do a trick to settle all of your disputes
#   Never toss a coin again.
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot do a trick - Elvis attempts a trick and either succeeds or fails
     
random = (min,max) ->
    Math.floor(Math.random() * (max - min + 1)) + min

description = [
  "a sick",
  "an insane",
  "a ballin ass",
  "a ridiculous",
  "a crazy",
  "a dangerous",
  "a mediocre",
  "a kind of lame",
  "an extreme",
  "a one of a kind"
]

trick = [
  "barrel roll",
  "540 backflip",
  "frontflip tailgrab",
  "juggling move",
  "360 varial heelflip",
  "motorcycle bus jump",
  "webinar",
  "yo yo trick",
  "fireball throw",
  "barehanded brick smash",
  "first try USB insertion",
  "untested deployment straight to production",
  "naked skydive",
  "lightning talk",
  "presentation at a PHP conference",
  "presentation at a NodeJS conference",
  "flying Karate kick at Kenpo master Ed Parker's dojo",
  "flying peanut butter and banana sandwich move",
  "pelvic thrust"
]

result = [
  "nails it.",
  "dies.",
  "does a pretty good job.",
  "fails miserably.",
  "it's perfect.",
  "does such a terrible job that he leaves his family out of shame.",
  "does such a great job he writes a song about it.",
  "does so poorly that he gets slapped by the colonel"
]

doTrick = -> "_attempts " + 
             description[random(0,description.length-1)] + " " + 
             trick[random(0,trick.length-1)] + " and " + 
             result[random(0,result.length-1)] + "_"

module.exports = (robot) ->
  robot.respond /do a (trick|barrel roll)/i, (msg) ->
    msg.emote doTrick()
