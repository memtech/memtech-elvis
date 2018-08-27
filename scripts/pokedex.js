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
        robot.logger.info('BUILDING POKEDEX:', data);
        let pokemonName = _.filter(data.names, name => name.language.name === "en")[0].name;
        robot.logger.debug('POKEDEX NUMBERS: ', data.pokedex_numbers);
        let pokemonNumber = _.filter(data.pokedex_numbers, number => number.pokedex.name === "national")[0].entry_number;
        let pokemonGenus = _.filter(data.genera, genus => genus.language.name === "en")[0].genus;

        this.getGenerationVersions(data.generation).then(generationVersions => {
          robot.logger.debug(generationVersions);
          let flavorTexts = _.map(data.flavor_text_entries, flavor_text => {
            robot.logger.debug(flavor_text);
            if(flavor_text.language.name === "en") {
              let flavorTextVersion = _.filter(generationVersions, version => {
                robot.logger.debug(version.name, flavor_text.version.name, version.name === flavor_text.version.name);
                return version.name === flavor_text.version.name;
              })[0];
              robot.logger.debug(flavorTextVersion);
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
          robot.logger.debug('NAME: ', pokemonName);
          robot.logger.debug('NUMBER: ', pokemonNumber);
          robot.logger.debug('FLAVOR TEXT: ', flavorTextString);
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
            robot.logger.debug(generationData);
            let generationVersions = _.map(generationData.version_groups, vg => this.getVersionGroupVersions(vg));
            robot.logger.debug(generationVersions);
            Promise.all(generationVersions).then(versions => {
              robot.logger.debug(versions);
              let squashed = _.flattenDeep(versions);
              resolve(squashed);
            }).catch(e => reject(e));
          }
        });
      });
    }

    getVersionGroupVersions(versionGroup) {
      return new Promise((resolve, reject) => {
        robot.logger.debug('Getting versions for the groups');
        robot.logger.debug(versionGroup);
        robot.http(versionGroup.url).get()((err, resp, body) => {
          if(err) {
            robot.logger.error(err);
            reject(new Error(err));
          } else {
            let versionGroupData = JSON.parse(body);
            robot.logger.debug(versionGroupData);
            let versions = _.map(versionGroupData.versions, version => this.getVersion(version));
            robot.logger.debug(versions);
            Promise.all(versions).then(versionsResolved => {
              let versionsFlat = _.flattenDeep(versionsResolved);
              robot.logger.debug(versionsFlat);
              let versionsParsed = _.map(versionsFlat, v => {
                return {
                  displayName: _.filter(v.names, name => {
                    robot.logger.debug(name);
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
            robot.logger.error(err);
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
        let sanitized = name.replace(/\s+/, '-').replace(/[^a-zA-Z0-9 ]/, '').toLowerCase();
        robot.http(`https://pokeapi.co/api/v2/pokemon-species/${sanitized}/`)
          .get()((err, resp, body) => {
            if(err) {
              reject(new Error(error));
            } else {
              const data = JSON.parse(body);
              robot.logger.debug(data);
              this.buildPokedexEntry(data).then(pokedexEntry => {
                robot.logger.info('ENTRY:', pokedexEntry);
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
              robot.logger.debug(data);
              this.buildPokedexEntry(data).then(pokedexEntry => {
                robot.logger.info('ENTRY:', pokedexEntry);
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
              robot.logger.debug(data);
              const randomPokemon = _.random(1, parseInt(data.count) + 1);
              robot.logger.info('RANDOM POKEMON NUMBER:', randomPokemon);
              this.getPokemonByNumber(randomPokemon).then(pokemon => {
                resolve(pokemon);
              }).catch(err => reject(err));
            }
          });
      });
    }
  };

  robot.respond(/pokedex\s+(\d+)/i, (msg) => {
    let pokedex = new PokeApi(robot);
    pokedex.getPokemonByNumber(msg.match[1]).then(pokemon => {
      msg.reply(pokemon);
    }).catch(err => msg.reply(err));
  });

  robot.respond(/pokedex\s+(?!random)(\w+)/i, (msg) => {
    let pokedex = new PokeApi(robot);
    pokedex.getPokemonByName(msg.match[1]).then(pokemon => {
      msg.reply(pokemon);
    }).catch(err => msg.reply(err));
  });

  robot.respond(/pokedex\s+random/i, (msg) => {
    let pokedex = new PokeApi(robot);
    pokedex.getRandomPokemon().then(pokemon => {
      msg.reply(pokemon);
    }).catch(err => msg.reply(util.inspect(err)));
  });

  robot.error((err, msg) => {
    robot.logger.error(err);
  });
}

