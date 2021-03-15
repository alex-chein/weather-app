const request = require('postman-request');

const geocode = ({ address, latitude, longitude } = {}, key, callback) => {
    let url;
    if(address) {
        url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${key}&limit=1`;
    } else if(latitude && longitude){
        url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}.json?access_token=${key}&limit=1`;
    } else {
        return callback('Missing parameters. Check your request and try again.')
    }

    request({ url, json: true }, (error, response, { features } = {}) => {
        if(error) callback('Unable to connect to location services.');
        else if(features.length === 0) callback('Unable to find location. Try another search.');
        else {
            const { place_name: location, center } = features[0];
            const [ latitude, longitude ] = center;
            callback(undefined, { longitude, latitude, location });
        }
    });
}

module.exports = geocode;