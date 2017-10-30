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
#
# Author:
#   github.com/mmccullar
#

response = "http://i.imgur.com/iLQ5k4i.gifv"

module.exports = (robot) ->
  robot.respond /show (me|us) automation|automate/i, (msg) ->
    msg.send response
