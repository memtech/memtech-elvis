module.exports = (robot) ->
  robot.respond /(avahi|systemd|pulseaudio|pulse audio)/i, (msg) ->
    msg.send "LENNART!"
