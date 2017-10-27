const getPair = (robot, fs, ts) => {
  return new Promise((resolve, reject) => {
    robot.http('https://min-api.cryptocompare.com/data/price')
      .query('fsym', fs)
      .query('tsyms', ts)
      .get()((err, resp, body) => {
        if (err) {
          reject(new Error(err))
        } else {
          const data = JSON.parse(body)
          if (data.Response === 'Error') {
            reject(new Error(data.Warning))
          } else {
            resolve(data)
          }
        }
      })
  })
}
module.exports = getPair
