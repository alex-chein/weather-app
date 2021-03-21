const express = require('express');
const path = require('path');
const hbs = require('hbs');
const weatherRouter = require('./routers/weather');
const viewsRouter = require('./routers/views');

const app = express();

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

// Setup Routes
app.use(weatherRouter);
app.use(viewsRouter);

module.exports= app;