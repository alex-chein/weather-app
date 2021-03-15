const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;
if(process.argv[2] === 'dev') {
    require('dotenv').config();
}
const weatherKey = process.env.WEATHER_STACK_ACCESS_KEY;
const mapboxKey = process.env.MAPBOX_API_KEY;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mike Rivera'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mike Rivera'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How can I help you?',
        name: 'Mike Rivera'
    });
});

app.get('/weather', (req, res) => {
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

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article Not Found',
        name: 'Mike Rivera',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Mike Rivera',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000!');
});