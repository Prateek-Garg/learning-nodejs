const request = require('request')

const geocode = (address, callback) => {

    if(address) {
        const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJhdGVla2dhcmciLCJhIjoiY2tlZnk4ZXJnMHFlaTMwczVhbnpzbzlhNCJ9.OueViEX1FnaVbN-I5jz5hw&limit=1'

        request({url: mapboxUrl, json: true}, (error, response) => {
    
            if(error){
                callback('Unable to make request', undefined);
            } else if (response.body.features.length === 0) {
                callback('Result not found!', undefined)
            } else {
                callback(undefined, 
                    {
                        Latitude: response.body.features[0].center[1], 
                        Longitude : response.body.features[0].center[0]
                    })
            }
        })
    } else {
        return console.log('Please provide location')
    }
  
}

module.exports = geocode;

