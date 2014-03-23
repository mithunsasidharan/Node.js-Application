// config/passport.js
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var userModule = require('../app/models/user');

//var userModule = new User();
// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session



    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    /*passport.serializeUser(function(user, done) {
    console.log("serializing.........")
    done(null, user);
});*/


    /* passport.deserializeUser(function (user, done) {
        console.log("Deserializing.........");
        userModule.findUser(user, done);/*function (err, user) {
            console.log("Deserializing after loading user.........")
            
        });
});*/

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) { // callback with email and password from our form
            // find a user whose email is the same as the forms email
            return userModule.validateUserNameAndPassword(email, password, done);
        }));
};