'use strict'

// Configure passport instance
function initialisePassport(app, passport) {
    // Include local authentication strategy
    var localStrategy = require('passport-local');

    // Local authentication
    passport.use(new localStrategy(function (username, password, done) {
        // Locate user object via username


        // Validate password
        

        // If password is invalid, return false and an error message
        //if (!isValid) {
        //    return done(null, false, { message: "Password is invalid" });
        //}

        // Valid user
        //return done(null, user);
    }));
    
    // Serialise the user object
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // Retrieve a serialised user object
    passport.deserializeUser(function (id, done) {

    });
}

module.exports = initialisePassport;