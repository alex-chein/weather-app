const { Router } = require('express');
const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');

const router = new Router();
const weatherKey = process.env.WEATHER_STACK_ACCESS_KEY;
const mapboxKey = process.env.MAPBOX_API_KEY;

console.log(weatherKey, mapboxKey);

router.get('/weather', (req, res) => {
    const { address, latitude, longitude } = req.query;
    if(!address && !(latitude && longitude)) return res.send({ error: 'You must provide a valid location.' });

    geocode({ address, latitude, longitude }, mapboxKey, (error, { longitude, latitude, location } = {}) => {
        if(error) return res.send({ error });
    
        forecast(longitude, latitude, weatherKey, (error, forecastData) => {
            if(error) return res.send({ error });
    
            res.send({
                location,
                forecast: forecastData
            });
        });
    });
});

module.exports = router;