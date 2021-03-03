const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWlndWVsLXJpdmVyYS1jaGVpbiIsImEiOiJja2xyZzRqaWswanAyMnZzMWVwbTdiM3FmIn0.43OSGQqq3qXvgs9MF0kG7w&limit=1`;

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