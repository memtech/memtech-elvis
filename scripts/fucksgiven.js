// Description:
//   Hubot graciously accepts praise for his actions
//   http://www.macmillandictionary.com/thesaurus-category/british/Ways-of-accepting-someone-s-thanks
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//
// Author:
//   github.com/Syliddar
//

const response = [
  "None!",
  "At least a Few.",
  "`Unhandled Exception: System.NullReferenceException: Object reference 'Fucks' not set to an instance of an object.`",
  "Several.",
  "`NameError: name 'fucks' is not defined`",
];

module.exports = robot => robot.respond(/(do|does) (I|he|she|they) give a fuck|how much (do|does) (I|he|she|they) care|how (many|much) fucks (do|does) (I|he|she|they) give|(do|does) (I|he|she|they) (look like (I|he|she|they))? give a fuck/i, msg => msg.send(msg.random(response)));
