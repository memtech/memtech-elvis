# Description:
#   Hubot returns the status of @Syliddar's latest beer
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot beerstatus
#
# Author:
#   github.com/Syliddar
moment = require('moment')

module.exports = (robot) ->
    humanDate = (dateStamp) ->
        moment(dateStamp).calendar()

    robot.respond /beer status (.*)/i, (msg)->
        msg.http("https://beer.jmyers.tech").get() (err, res, body) ->
            if res.statusCode != 200
                msg.send "No response. Couldn't check the beer status."
            else
                object = JSON.parse(body)
                msg.send "Latest sensor data for #{data.beer_name}. SG: #{data.sg}; Temp: #{data.temp}; Sensor reading taken on #{humanDate(data.time)}"