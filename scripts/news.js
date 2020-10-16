//  Description:
//    A bot to gather news based on a topic
// 
//  Author:
// 	Capocaccia
// 
//  Commands:
//   hubot news
//   hubot news topic


const getNews = require('../helper/news.js')

module.exports = robot => {
    robot.respond(/(news)\s*(\w*)/i, (res) => {
        keyword = res.match[2].trim()
        keyword = keyword.length > 0 ? keyword : "technology"
        getNews(robot, keyword)
        .then((data) => {
            res.reply(JSON.stringify(data))
        })
    })
};
  