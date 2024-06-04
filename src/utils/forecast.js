const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e8a69ae147933c8a87f578767674d563&query=' + latitude + ',' + longitude 
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.temperature + ', ' + body.current.weather_descriptions[0] + ', It feels like ' + body.current.feelslike +',' +' The humidity is ' + body.current.humidity + '%')
        }
    })
}

module.exports = forecast