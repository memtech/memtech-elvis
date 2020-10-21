// Description:
//   Hubot returns the status of a World of Warcraft server
//
//

// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot realmstatus [realmname]
//
// Author:
//   github.com/unstablereality

module.exports = robot => robot.respond(/realm status (.*)/i, function(msg){
    const realm = `${msg.match[1]}`;
    const apiKey = process.env.BLIZZARD_API_KEY;
    return msg.http(`https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=${apiKey}&realms=${realm}`).get()(function(err, res, body) {
        if (res.statusCode !== 200) {
            return msg.send("No response from API. Couldn't check the realm status. Try https://worldofwarcraft.com/en-us/game/status instead.");
        } else {
            const object = JSON.parse(body);
            if (object['realms'][0]['name'].toLowerCase() === realm.toLowerCase()) {
                const realmname = object['realms'][0]['name'];
                const status = object['realms'][0]['status'] ? "up" : "down";
                return msg.send(`${realmname} is currently ${status}.`);
            } else {
                return msg.send("Looks like you didn't specify a valid realm name. Have you tried getting good?");
            }
        }
    });
});
