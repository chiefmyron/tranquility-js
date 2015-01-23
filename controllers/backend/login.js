'use strict';

// Display login page
exports.index = function (req, res) {
    res.render('backend/login', {
        // Set page layout to use
        layout: '../layouts/backend/login.html',
        csrfToken: req.csrfToken(),

        // Page contents
        title: 'Tranquility',
        heading: 'login'

    });
}

// Process attempted login
exports.login = function (req, res) {
    res.send('Process login goes here!');
}

// Display 'Forgot your password' page
exports.forgotPassword = function (req, res) {
    res.render('backend/login/forgot-password', {
        // Set page layout to use
        layout: '../layouts/backend/login.html',
        csrfToken: req.csrfToken(),

        // Page contents
        title: 'Tranquility',
        heading: 'forgot your password?'
    });
}