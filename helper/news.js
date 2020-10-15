const getNews = (robot, topic) => {
    let twoDaysAgo = new Date()
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
        twoDaysAgo = twoDaysAgo.toISOString();
    let today = new Date().toISOString()

    return new Promise((resolve, reject) => {
        let response = '';
        //this is a free API and a public API key.
        robot.http(`http://newsapi.org/v2/top-headlines?q=${topic}&from=${twoDaysAgo}&to=${today}&pageSize=3&apiKey=835dc66684334edf8cd1d542023afc08`)
            .get()((err, resp, body) => {
            if (err) {
                reject(new Error(err))
            } else {
                const data = JSON.parse(body)

                if (data.status === 'error') {
                    console.log(data)
                    reject(new Error('Something went wrong getting the news!'))
                }

                if(data.totalResults > 0) {

                    data.articles.forEach(article => {
                        response += `\n Source: ${article.source.name} \n`
                        response += ` Title: ${article.title} \n`
                        response += ` Url: ${article.url}`
                    })

                } else {
                    response += `No news found for the topic: ${topic}`

                }

                resolve(response)
            }
        })
    })
}

module.exports = getNews