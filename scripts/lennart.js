/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
module.exports = robot => robot.respond(/.*(avahi|systemd|pulseaudio|pulse audio).*/i, msg => msg.send("LENNART!"));
