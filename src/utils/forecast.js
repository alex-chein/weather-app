const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e80ec22f21efe6e9cd892c24666eb1c1&query=${longitude},${latitude}&units=f`;

    request({ url, json: true }, (error, response, data) => {
        if(error) callback('Unable to connect to weather services.');
        else if(data.error) callback('Unable to find location. Try another location.');
        else {
            const { temperature, feelslike, weather_descriptions: weather, humidity } = data.current;
            callback(
                undefined,
                `The weather is ${weather[0]}.
                It is currently ${temperature} degrees out.
                It feels like ${feelslike} degrees out.
                The current humidity is ${humidity}%.`
            );
        }
    })
}

module.exports = forecast;