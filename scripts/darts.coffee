# Description
#   Have an office dart fight, even when working from home
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot shoot target (in the legs/head/body) - Fires a foam dart at the target
#
# Notes:
#   None
#
# Author:
#   bsensale

module.exports = (robot) ->

  robot.respond /shoot ((.+)(?: in the )(head|body|legs)?|(.*))/i, (msg) ->

    victimStr = msg.match[2] ? msg.match[4]
    victimStr = victimStr.substr(1) if victimStr.charAt(0) is '@'

    users = robot.brain.usersForFuzzyName(victimStr)
    if users.length > 1
      msg.reply "Be more specific; I can't shoot more than one person at once!"
      return
    victim = if users.length is 1 then users[0] else null

    if not victim
      msg.reply "You want me to shoot someone who doesn't exist.  You are strange."
      return

    msg.reply "Target acquired."
    aim = msg.match[3]
    if not aim
      aim = msg.random ["head", "body", "legs"]
    target = msg.random ["#{aim}", "#{aim}", "#{aim}", "#{aim}", "miss"]

    victimName = victim.name

    result = (target) ->
      if target is "miss"
        "The shot sails safely overhead."
      else if target is "head"
        msg.random [
          "It hits #{victimName} right in the eye!  You monster!",
          "It bounces right off #{victimName}'s nose.",
          "It hits #{victimName} in the ear.  Why would you do that?",
          "POW!  BANG!  #{victimName} is hit right in the kisser!",
          "Right in the temple.  #{victimName} falls limp to the floor."
        ]
      else if target is "body"
        msg.random [
          "The shot bounces off #{victimName}'s shoulder.",
          "It hits #{victimName} right in the chest.  #{victimName} has trouble drawing their next breath.",
          "The dart hits #{victimName} in the stomach and gets lodged in their belly button.",
          "It hits #{victimName} in the back, causing temporary paralysis.",
          "The dart bounces off #{victimName}'s left shoulder, spinning them violently around."
        ]
      else if target is "legs"
        msg.random [
          "The dart smacks into #{victimName}'s thigh.  Charlie Horse!!!",
          "The dart hits #{victimName} square in the crotch.  I need an adult!",
          "It hits #{victimName} right in the kneecap.  What did they owe you money?",
          "It smacks into #{victimName}'s pinkie toe.  They go wee wee wee all the way home!",
          "The dart hits right on #{victimName}'s shin, knocking them to the ground"
        ]

    msg.emote "fires a foam dart at #{victimName}'s #{aim}.  #{result target}"
