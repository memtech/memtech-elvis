# Description
#   A hubot script that retreives random jokes from multiple subreddits
#
# Configuration:
#   None
#
# Commands:
#   hubot tell me a joke - Replies with random joke from /r/cleanjokes
#   hubot tell me a <allowed-type> joke -
#       Replies with random joke from /r/<allowed-type>jokes
#   hubot <allowed-type> joke -
#       Replies with random joke from /r/<allowed-type>jokes
#
# Notes:
#   Allowed types:
#     simple - r/jokes
#     dad - r/dadjokes
#     clean - r/cleanjokes
#     classy - r/classyjokes
#     mom - r/mommajokes
#     yo momma - r/mommajokes
#
# Author:
#   whospablo, tombell, ericjsilva

module.exports = (robot) ->
  sendJokeFrom = (msg, url) ->
    msg.http("https://www.reddit.com/r/#{url}.json")
    .get() (err, res, body) ->
      try
        data = JSON.parse body
        children = data.data.children
        joke = msg.random(children).data

        joketext = joke.title.replace(/\*\.\.\.$/,'') +
        ' ' + joke.selftext.replace(/^\.\.\.\s*/, '')

        msg.send joketext.trim()

      catch ex
        msg.send "I can't tell you a joke :'( - #{ex}"

  robot.respond /(tell me a )?(.*)joke$/i, (msg) ->
    did_ask = msg.match[1]
    type = msg.match[2].trim()

    type_to_link = {
      'simple': "jokes",
      'dad': 'dadjokes',
      'clean': 'cleanjokes',
      'classy': 'classyjokes',
      'mom': 'mommajokes',
      'yo momma': 'mommajokes',
      'unfiltered': 'jokes'
    }

    if type of type_to_link
      sendJokeFrom(msg, type_to_link[type])
    else if did_ask
      sendJokeFrom(msg, "cleanjokes")
