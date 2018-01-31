# Description:

# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
# Elvis how excited are they? - gif response
# Author:
#   github.com/mmccullar
#

response = "http://i.imgur.com/8zMPb.gif"

module.exports = (robot) ->
  robot.respond /how excited (is|are) (he|him|her|she|they|them)?/i, (msg) ->
    msg.send response
