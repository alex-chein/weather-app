const { Router } = require('express');

const router = new Router();

router.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mike Rivera'
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mike Rivera'
    });
});

router.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How can I help you?',
        name: 'Mike Rivera'
    });
});

router.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article Not Found',
        name: 'Mike Rivera',
        errorMessage: 'Help article not found'
    });
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Mike Rivera',
        errorMessage: 'Page not found'
    });
});

module.exports = router;