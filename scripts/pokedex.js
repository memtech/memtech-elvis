// Description:
//  Query https://pokeapi.co for Pokemon data
//
// Dependencies:
//  None
//
// Configuration:
//  None
//
// Commands:
//  elvis pokedex <name> - Grabs Pokedex data for <name>
//  elvis pokedex <num> - Grabs Pokedex data for Pokemon # <num>
//  elvis pokedex random
//
// Author:
//  Cameron Roe

const _ = require('lodash');
const util = require('util');

module.exports = function(robot) {
  let PokeApi = class {
    constructor(robot) {
      this.robot = robot;
    }

    buildPokedexEntry(data) {
      return new Promise((resolve, reject) => {
        let pokemonName = _.filter(data.names, name => name.language.name === "en")[0].name;
        let pokemonNumber = _.filter(data.pokedex_numbers, number => number.pokedex.name === "national")[0].entry_number;
        let pokemonGenus = _.filter(data.genera, genus => genus.language.name === "en")[0].genus;

        this.getGenerationVersions(data.generation).then(generationVersions => {
          let flavorTexts = _.map(data.flavor_text_entries, flavor_text => {
            if(flavor_text.language.name === "en") {
              let flavorTextVersion = _.filter(generationVersions, version => {
                return version.name === flavor_text.version.name;
              })[0];
              if(!flavorTextVersion) {
                return;
              }
              return {
                versionName: flavorTextVersion.displayName,
                flavorText: flavor_text.flavor_text
              };
            }
          });

          flavorTexts = _.filter(flavorTexts, t => t !== undefined);
          let flavorTextString = _.map(flavorTexts, flavorText => {
            return `${flavorText.versionName}: ${this.stripWhitespace(flavorText.flavorText)}`;
          }).join('\n\n');
          resolve(`Pokedex entry for ${pokemonName} - #${pokemonNumber}\nThe ${pokemonGenus}\n${flavorTextString}`);
        }).catch(err => reject(err));
      });
    }

    getGenerationVersions(generation) {
      return new Promise((resolve, reject) => {
        robot.http(generation.url).get()((err, resp, body) => {
          if(err) {
            reject(new Error(err));
          } else {
            let generationData = JSON.parse(body);
            let generationVersions = _.map(generationData.version_groups, vg => this.getVersionGroupVersions(vg));
            Promise.all(generationVersions).then(versions => {
              let squashed = _.flattenDeep(versions);
              resolve(squashed);
            }).catch(e => reject(e));
          }
        });
      });
    }

    getVersionGroupVersions(versionGroup) {
      return new Promise((resolve, reject) => {
        robot.http(versionGroup.url).get()((err, resp, body) => {
          if(err) {
            reject(new Error(err));
          } else {
            let versionGroupData = JSON.parse(body);
            let versions = _.map(versionGroupData.versions, version => this.getVersion(version));
            Promise.all(versions).then(versionsResolved => {
              let versionsFlat = _.flattenDeep(versionsResolved);
              let versionsParsed = _.map(versionsFlat, v => {
                return {
                  displayName: _.filter(v.names, name => {
                    return name.language.name === "en";
                  })[0].name,
                  name: v.name
                };
              });
              resolve(versionsParsed);
            }).catch(err => reject(err));
          }
        });
      });
    }

    stripWhitespace(string) {
      return string.replace(/[\n\t\f]/g, ' ').replace(/\u00ad /g, '');
    }

    getVersion(version) {
      return new Promise((resolve, reject) => {
        robot.http(version.url).get()((err, resp, body) => {
          if(err) {
            reject(new Error(err));
          } else {
            let versionData = JSON.parse(body);
            resolve(versionData);
          }
        });
      });
    }

    getPokemonByName(name) {
      return new Promise((resolve, reject) => {
        let sanitized = name.replace(/\s+/, '-').replace(/[^a-zA-Z0-9\- ]/, '').toLowerCase();
        robot.http(`https://pokeapi.co/api/v2/pokemon-species/${sanitized}/`)
          .get()((err, resp, body) => {
            if(err) {
              reject(new Error(error));
            } else {
              const data = JSON.parse(body);
              this.buildPokedexEntry(data).then(pokedexEntry => {
                resolve(pokedexEntry);
              });
            }
          });
      });
    }

    getPokemonByNumber(number) {
      return new Promise((resolve, reject) => {
        robot.http(`https://pokeapi.co/api/v2/pokemon-species/${number}/`)
          .get()((err, resp, body) => {
            if(err) {
              reject(new Error(err));
            } else {
              const data = JSON.parse(body);
              this.buildPokedexEntry(data).then(pokedexEntry => {
                resolve(pokedexEntry);
              });
            }
          });
      });
    }

    getRandomPokemon() {
      return new Promise((resolve, reject) => {
        robot.http(`https://pokeapi.co/api/v2/pokemon-species/`)
          .get()((err, resp, body) => {
            if(err) {
              reject(new Error(err));
            } else {
              const data = JSON.parse(body);
              const randomPokemon = _.random(1, parseInt(data.count) + 1);
              this.getPokemonByNumber(randomPokemon).then(pokemon => {
                resolve(pokemon);
              }).catch(err => reject(err));
            }
          });
      });
    }
  };

  const ERROR_MESSAGE = "Sorry, could not retrieve Pokedex data!";

  function handleErr(msg, err) {
    robot.logger.error(util.inspect(err));
    msg.reply(ERROR_MESSAGE);
  }

  robot.respond(/pokedex\s+(\d+)/i, (msg) => {
    let pokedex = new PokeApi(robot);
    pokedex.getPokemonByNumber(msg.match[1]).then(pokemon => {
      msg.reply(pokemon);
    }).catch(err => {
      handleErr(msg, err);
    });
  });

  robot.respond(/pokedex\s+(?!random)([a-zA-Z\-]+)/i, (msg) => {
    let pokedex = new PokeApi(robot);
    pokedex.getPokemonByName(msg.match[1]).then(pokemon => {
      msg.reply(pokemon);
    }).catch(err => {
      handleErr(msg, err);
    });
  });

  robot.respond(/pokedex\s+random/i, (msg) => {
    let pokedex = new PokeApi(robot);
    pokedex.getRandomPokemon().then(pokemon => {
      msg.reply(pokemon);
    }).catch(err => {
      handleErr(msg, err);
    });
  });

  robot.error((err, msg) => {
    robot.logger.error(err);
  });
}

