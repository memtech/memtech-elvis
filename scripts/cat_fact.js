// Description:
//  Query https://catfact.ninja for cat facts
//
// Dependencies:
//  None
//
// Configuration:
//  None
//
// Commands:
//  elvis catfact - returns a random cat fact
//
// Author:
//  Xavier Tilley

module.exports = function (robot) {
  robot.respond(/catfact/i, function(msg) {
    return msg.http(`https://catfact.ninja/fact?max_length=140`)
      .get()(function(err, res, body) {
        let jsonBody = JSON.parse(body);
        if (err) {
          return msg.send(`The doggos stole the catfacts!`);
        } else {
          return msg.send(jsonBody.fact);
        }
      });
  });

  robot.respond(/catbreed/i, function(msg) {
    return msg.http(`https://catfact.ninja/breeds?limit=1`)
      .get()(function(err, res, body) {
        const data = JSON.parse(body);
        if (err) {
          return msg.send(`Silly hooman! Only doggos have breeds!`);
        } else {
          let breed = data.breed
          let country = data.country
          let origin =  data.origin
          let coat = data.coat
          let pattern = data.pattern
          let reply = `Today's Cat Breed is ${breed}!\nThey are from ${country}, have a ${origin} origin and a ${coat} coat with ${pattern} patterns.`
          return msg.send(reply);
        }
      });
  });
}
