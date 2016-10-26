# Description:
#   Memphis Technology User Groups Meetup Search
#
# Dependencies:
#   None
#
# Commands:
#   meetup|event $search_terms - Display information for the next meetup matching the $search_terms
#   link meetup|event $search_terms - Get a permanent url for the next meetup matching $search_tems
#
# Author:
#   dpritchett
#   joshwlewis


base_url     = "http://meetups.memphistechnology.org/"

moment   = require('moment')

module.exports = (robot) ->

  robot.respond /link (event|meetup) (.*)/i, (msg) ->
    link = base_url + msg.match[2]
    msg.send link
    robot.tweet link

  robot.respond /(event|meetup)(.*)/i, (msg) ->
    keyword = msg.match[2].trim()

    msg.http("#{base_url}/calendar.json")
      .query(keyword: keyword)
      .get() (err, res, body) ->
        if err
          msg.send "Calendar API error: #{err}"
        else
          # Filter out any meetups that happened prior to today.
          today = new Date()
          meetups = [
            m for m in JSON.parse(body).meetups when today < new Date(m.time)
          ][0]

          if meetups.length > 0
            meetup = meetups[0]
            time = new Date(meetup.time)
            humanTime = moment(time).calendar()
            resp = "#{meetup.name}: #{humanTime} "
            resp += "@#{meetup.venue.name} " if meetup.venue?

            # provide generic meetup link if no keywords were supplied
            if !!keyword.length
              resp += "(#{base_url}#{escape keyword})"
            else
              resp += "(#{meetup.event_url})"

            msg.send resp
            robot.tweet resp
          else
            msg.send "Sorry, I couldn't find a meetup matching #{keyword}."
