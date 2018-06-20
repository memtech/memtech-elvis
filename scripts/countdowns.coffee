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

  #daysUntil = (dateStamp) ->
  #  moment(dateStamp).diff(moment(), 'days')

  daysUntil = (dateStamp) ->
    moment(dateStamp).fromNow()

  countdownTo = (args) ->
    robot.respond args.trigger, (msg) ->
      msg.send [
        args.title,
        "happens #{daysUntil(args.date)}",
        "(#{humanDate(args.date)})",
        args.link
      ].join(' ')


  ###########################
  # Countdowns!
  ###########################
  # timestamp docs: http://momentjs.com/docs/

  countdownTo
    title:    "GiveCamp Memphis (TBD)"
    date:     '2019-02-15 17:00'
    link:     "http://givecampmemphis.org/"
    trigger:  /give camp|givecamp/i

  countdownTo
    title:    "HACKmemphis"
    date:     '2018-09-28 18:00'
    link:     "http://www.hackmemphis.com/"
    trigger:  /days until hack memphis|days until hackmemphis|hack memphis|hackmemphis/i

  countdownTo
    title:    "TechCamp Memphis"
    date:     '2018-10-28'
    link:     "http://techcampmemphis.org"
    trigger:  /days until tech camp|days until techcamp|tech camp|techcamp/i

  countdownTo
    title:    "Christmas"
    date:     '2018-12-25'
    trigger:  /days until christmas|christmas/i
    
  countdownTo
    title:    "Thanksgiving"
    date:     "2018-11-24"
    trigger:  /days until thanksgiving|thanksgiving /i
    
  countdownTo
    title:    "MidsouthCon"
    date:     "2018-03-09 17:00"
    link:     "http://www.midsouthcon.org"
    trigger:  /days until midsouthcon|midsouthcon/i
    
#  countdownTo
#    title:    "New Zeldar"
#    date:     "2017-3-3 00:00"
#    link:     "http://www.zelda.com/breath-of-the-wild/"
#    trigger:  /days until zelda|new zelda|countdown to zelda/i
	
  careTrigger = /days until I care|when will I care/i
  countdownTo
    title:    "You begining to care"
    date:      moment().add(Math.random() * (1000000 - 5000) + 5000, 'd')
    link:     "  ¯\\_(ツ)_/¯  "
    trigger:  careTrigger

  # the robot will fail the build if the assumptions documented as match assertions are false
  robot.assertMatchesAs careTrigger, "days until I care lol", ["days until I care"]
  robot.assertDoesNotMatch careTrigger, "days before I care"
	
# countdownTo
#   title:    "Google I/O"
#   date:     "2017-05-17 8:00"
#   link:     "https://events.google.com/io2017/"
#   trigger:  /days until googlecon|days until google io|when is googlecon|when is google io/i
	
# countdownTo
#   title:    "Microsoft BUILD"
#   date:     "2017-05-10 8:00"
#   link:     "https://build.microsoft.com/"
#   trigger:  /days until MS Build|days until Build|when is MS Build|when is build/i
	 
# countdownTo
#   title:    "Mass Effect: Andromeda"
#   date:     "2017-03-21 00:00"
#   link:     "https://www.masseffect.com"
#  trigger:  /days until Mass effect|days until andromeda|days until mass effect andromeda|when is Mass effect|when is andromeda|when is Mass Effect andromeda/

  #countdownTo
  #  title:    "SuperLunch"
  #  date:     "2015-11-25 11:30"
  #  link:     "http://www.meetup.com/memphis-technology-user-groups/events/225508682/"
  #  trigger:  /days until superlunch|superlunch/i
