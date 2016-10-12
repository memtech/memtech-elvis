# Description:
#   Show slack user's hometown from github.com/memtech/people
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   elvis hometown dpritchett - show slack user @dpritchett's home town on a map
#
# Author:
#   Daniel J. Pritchett <dpritchett@gmail.com>

module.exports = (robot) ->
  JSON_SOURCE_URI = "https://raw.githubusercontent.com/memtech/people/gh-pages/js/locations.js"
  REPO_URI = "https://github.com/memtech/people/blob/gh-pages/js/locations.js"
  MAP_URI_BASE= "http://maps.google.com/maps?z=17&q="

  mapUri = (user) ->
    "#{MAP_URI_BASE}#{user.latitude},#{user.longitude}"

  checkCompany = (company) ->
    if company
      company = company.trim()
      companyString = ", and works at #{company}"
    else
      companyString = ""
    companyString

  robot.respond /hometown @?(\w+)$/i, (msg) ->
    username = msg.match[1]

    msg.http(JSON_SOURCE_URI)
      .get() (err, res, body) ->
        if res.statusCode == 404
          msg.send 'Map URI not responding'
        else
          hax = eval body

          for user in locations
            if user.slack_handle is username
              return msg.send "#{user.name} hails from #{user.origin}#{checkCompany(user.company)}! #{mapUri(user)}"

          msg.send "User #{username} not found.  Make sure there's a `slack_handle` listed for this user at #{REPO_URI}"

