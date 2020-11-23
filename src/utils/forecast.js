const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5b25ba098196f14c717d220fc375605f&query=' + latitude + ',' + longitude 

    request({ url, json: true}, (error,{ body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is current " + body.current.temperature + " degress out. It feels like " + body.current.feelslike + " degress out.")
        }
      })

  }



module.exports = forecast