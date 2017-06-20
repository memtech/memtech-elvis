# Description:
#   Hubot returns the status of a World of Warcraft server
#
# https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=969wgh2ukfpu48wjuwcfz5shp4n5umzz

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
#
#{"realms":[{"type":"pve","population":"medium","queue":false,"status":true,"name":"Proudmoore","slug":"proudmoore","battlegroup":"Bloodlust","locale":"en_US","timezone":"America/Los_Angeles","connected_realms":["proudmoore"]}]}

module.exports = (robot) ->
    robot.respond /realm status (.*)/i, (msg)->
        realm = "#{msg.match[1]}"
        apiKey = process.env.BLIZZARD_API_KEY
        msg.http("https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=#{apiKey}&realms=#{realm}").get() (err, res, body) ->
            if res.statusCode == 404
                msg.send "No response from API. Couldn't check the realm status. Try https://worldofwarcraft.com/en-us/game/status instead."
            else
                object = JSON.parse(body)
                realmname = object['realms'][0]['name']
                status = if object['realms'][0]['status'] then "up" else "down"
                msg.send "#{realmname} is currently #{status}."
