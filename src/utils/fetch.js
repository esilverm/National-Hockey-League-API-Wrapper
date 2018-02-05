/**
 * Request data from api and return JSON response.
 *
 * @param {string} url - desired endpoint to request data from
 * @param {function} callback - function to modify data retrieved
 */

var get = function(url, callback) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? require('https'): require('http')
    const request = lib.get(url, res => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        reject(new Error('Request failed with error code: ' + res.statusCode))
      }
      const body = []
      res.on('data', d => {
        body.push(d)
      })
      res.on('end', () => {
        try {
          resolve(JSON.parse(body.join('')))
        } catch (err) {
          reject(err)
        }
      })
    })
    request.on('error', (error) => {
      reject(error)
    })
  })
}

module.exports = get;
