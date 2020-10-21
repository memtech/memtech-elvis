/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Description
//   A hubot script that retreives random jokes from multiple subreddits
//
// Configuration:
//   None
//
// Commands:
//   hubot tell me a joke - Replies with random joke from /r/cleanjokes
//   hubot tell me a <allowed-type> joke -
//       Replies with random joke from /r/<allowed-type>jokes
//   hubot <allowed-type> joke -
//       Replies with random joke from /r/<allowed-type>jokes
//
// Notes:
//   Allowed types:
//     simple - r/jokes
//     dad - r/dadjokes
//     clean - r/cleanjokes
//     classy - r/classyjokes
//     mom - r/mommajokes
//     yo momma - r/mommajokes
//
// Author:
//   whospablo, tombell, ericjsilva

module.exports = function(robot) {
  const sendJokeFrom = (msg, url) => msg.http(`https://www.reddit.com/r/${url}.json`)
  .get()(function(err, res, body) {
    try {
      const data = JSON.parse(body);
      const {
        children
      } = data.data;
      const joke = msg.random(children).data;

      const joketext = joke.title.replace(/\*\.\.\.$/,'') +
      ' ' + joke.selftext.replace(/^\.\.\.\s*/, '');

      return msg.send(joketext.trim());

    } catch (ex) {
      return msg.send(`I can't tell you a joke :'( - ${ex}`);
    }
  });

  return robot.respond(/(tell me a )?(.*)joke$/i, function(msg) {
    const did_ask = msg.match[1];
    const type = msg.match[2].trim();

    const type_to_link = {
      'simple': "jokes",
      'dad': 'dadjokes',
      'clean': 'cleanjokes',
      'classy': 'classyjokes',
      'mom': 'mommajokes',
      'yo momma': 'mommajokes',
      'unfiltered': 'jokes'
    };

    if (type in type_to_link) {
      return sendJokeFrom(msg, type_to_link[type]);
    } else if (did_ask) {
      return sendJokeFrom(msg, "cleanjokes");
    }
  });
};
