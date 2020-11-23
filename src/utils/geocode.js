const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGliaW1hcnU1NSIsImEiOiJja2VybDh0YmQwdWZ4MzBxeG1pNXJ5N2hjIn0.noznoTBfES4_4fu0DFF3wg&limit=1'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    }  else if (body.features.length === 0) {
      callback('住所を正確に入力して下さい。', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })

}

module.exports = geocode