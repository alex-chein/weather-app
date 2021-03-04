const request = require('postman-request');

const geocode = (address, key, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${key}&limit=1`;

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