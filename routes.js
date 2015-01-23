'use strict'

// Include express
var express = require('express');

// Set up routes for the frontend section of the application
function configureFrontendRoutes(app, passport) {
    var router = express.Router();    
    
    // Homepage
    router.get('/', function (req, res) {
        res.render('frontend/home');
    });

    // Send back the configured router
    return router;
}

// Set up routes for the administration section of the application
function configureBackendRoutes(app, passport) {
    var router = express.Router();

    // Homepage
    router.get('/', function (req, res) {
        res.send('This is the administration home page!');
    });
    
    // Login
    router.get('/login', require('./controllers/backend/login').index);
    router.post('/login', require('./controllers/backend/login').login);
    router.get('/login/forgot-password', require('./controllers/backend/login').forgotPassword);
    
    // Send back the configured router
    return router;
}

module.exports = function (app, passport) {
    app.use('/', configureFrontendRoutes(app, passport));
    app.use('/administration', configureBackendRoutes(app, passport));
}