// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Description
//   Returns the URL of the first google hit for a query
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot google me <query> - Googles <query> & returns 1st result's URL
//
// Author:
//   searls

module.exports = robot => robot.respond(/(google)( me)? (.*)/i, msg => googleMe(msg, msg.match[3], url => msg.send(url)));

var googleMe = (msg, query, cb) => msg.http('http://www.google.com/search')
  .query({q: query})
  .get()((err, res, body) => cb(__guard__(body.match(/class="r"><a href="\/url\?q=([^"]*)(&amp;sa.*)">/), x => x[1]) || `Sorry, Google had zero results for '${query}'`));

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}