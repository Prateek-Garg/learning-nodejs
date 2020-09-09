const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cee2c0156ce8cba6612948be5b8e08cb&query=' + latitude + ',' + longitude;
    console.log(url);
    request({url: url, json: true}, (error, response) => {
        console.log(response.body.error)
        if(error) {
            callback('Unable to fetch weather information', undefined)
        } else if (response.body.error) {
            callback('No record found', undefined)
        } else {
            callback(undefined, {temperature: response.body.current.temperature})
        }
    })
}

module.exports = forecast;


// request({url: url, json: true}, (error, response) => {
//     console.log(response.body.current.temperature, 'but it feels like ', response.body.current.feelslike);
// })