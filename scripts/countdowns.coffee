# Description:
#   Give camp is happening soon
#
# Dependencies:
#   "moment": "2.8.3",
#
# Configuration:
#   None
#
# Commands:
#   elvis give camp - Display a countdown til givecamp starts

moment = require('moment')

module.exports = (robot) ->

  ###########################
  # plumbing
  ###########################

  humanDate = (dateStamp) ->
    moment(dateStamp).calendar()

  timeUntil = (dateStamp) ->
    moment(dateStamp).fromNow()

  daysUntil = (dateStamp) ->
    moment(dateStamp).diff(moment(), 'days')

  countdownTo = (args) ->
    robot.respond args.trigger, (msg) ->
      msg.send [
        args.title,
        "happens in #{daysUntil(args.date)} days",
        "(#{humanDate(args.date)})",
        args.link
      ].join(' ')


  ###########################
  # Countdowns!
  ###########################
  # timestamp docs: http://momentjs.com/docs/

  countdownTo
    title:    "GiveCamp Memphis (Actual Date TBD)"
    date:     '2016-02-20 18:00'
    link:     "http://givecampmemphis.org @ Cowork Memphis"
    trigger:  /give camp|givecamp/i

  countdownTo
    title:    "HACKmemphis"
    date:     '2016-09-23 18:00'
    link:     "http://www.hackmemphis.com/"
    trigger:  /days until hack memphis|days until hackmemphis|hack memphis|hackmemphis/i

  countdownTo
    title:    "TechCamp Memphis (Actual Date TBD)"
    date:     '2016-11-07'
    link:     "http://techcampmemphis.org"
    trigger:  /days until tech camp|days until techcamp|tech camp|techcamp/i

  countdownTo
    title:    "Christmas"
    date:     '2016-12-25'
    trigger:  /days until christmas|christmas/i
    
  countdownTo
    title:    "MidsouthCon 35"
    date:     "2017-3-24 17:00"
    link:     "http://www.midsouthcon.org"
    trigger:  /days until midsouthcon|midsouthcon/i
    
  #countdownTo
  #  title:    "SuperLunch"
  #  date:     "2015-11-25 11:30"
  #  link:     "http://www.meetup.com/memphis-technology-user-groups/events/225508682/"
  #  trigger:  /days until superlunch|superlunch/i
