# Description:
#   Hubot returns the status of @Syliddar's latest beer
#
# Dependencies:
#   "moment": "2.8.3",
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
  robot.respond /(beer status)|(@Syliddar beer status)|(how's my beer)|(how's @Syliddar's beer)|(how is my beer)|(how is @Syiliddar's beer)/i, (msg)->
    msg.http("https://beer.jmyers.tech").get() (err, res, body) ->
      if res.statusCode != 200
        msg.send "No response. Couldn't check the beer status."
      else
        object = JSON.parse(body)
        msg.send "Latest sensor data for #{data.beer_name}. SG: #{data.sg}; Temp: #{data.temp}; Sensor reading taken on #{humanDate(data.time)}"