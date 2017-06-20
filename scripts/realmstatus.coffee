# Description:
#   Hubot returns the status of a World of Warcraft server
#
#

# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot realmstatus [realmname]
#
# Author:
#   github.com/unstablereality

module.exports = (robot) ->
    robot.respond /realm status (.*)/i, (msg)->
        realm = "#{msg.match[1]}"
        apiKey = process.env.BLIZZARD_API_KEY
        msg.http("https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=#{apiKey}&realms=#{realm}").get() (err, res, body) ->
            if res.statusCode != 200
                msg.send "No response from API. Couldn't check the realm status. Try https://worldofwarcraft.com/en-us/game/status instead."
            else
                object = JSON.parse(body)
                if object['realms'][0]['name'].toLowerCase() == realm
                    realmname = object['realms'][0]['name']
                    status = if object['realms'][0]['status'] then "up" else "down"
                    msg.send "#{realmname} is currently #{status}."
                else
                    msg.send "Looks like you didn't specify a valid realm name. Have you tried getting good?"
