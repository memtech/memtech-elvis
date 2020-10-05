# Description:
#   Grab stock information from Yahoo! Finance
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot stocks <ticker> - Return stock price for <ticker>
#
# Author:
#   Daniel Soskel

module.exports = (robot) ->
  robot.respond /stocks\s+(\w+)/i, (msg) ->
    ticker = "#{msg.match[1]}"

    msg.http("http://download.finance.yahoo.com/d/quotes.csv?s=#{ticker}&f=l1")
      .get() (err, res, body) ->
        if res.statusCode == 404
          msg.send "Stock not found or could not contact :yahoo: Finance."
        else
          msg.send "#{ticker}: $#{body}"
