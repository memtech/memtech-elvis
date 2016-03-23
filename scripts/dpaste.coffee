# Description:
#   Dpaste is awesome
#
# Dependencies:
#   "request": "2.14.0",
#
# Configuration:
#   None
#
# Commands:
#
# Author:
#   dpritchett

request = require 'request'

module.exports = dpaste = (longText, msg) ->
  apologia = "Woah there! Find that long response here: "
  pasteUrl = "http://dpaste.com/api/v2/"

  request.post {url: pasteUrl, form: {content: longText}},
    (error, response, body) ->
      throw error if error

      resultUrl = response.headers.location

      msg.send apologia + resultUrl
