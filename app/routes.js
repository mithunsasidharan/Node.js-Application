// app/routes.js
var userModule = require('../app/models/user');

module.exports = function (app, passport) {
    //var http   = require('http');
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('login.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================

    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect('/login'); //Inside a callback… bulletproof!
        });
    });

    app.post('/register', function (req, res) {
        var user = req.body.user;
        console.log(user);
        if (hasNull(user))
            res.redirect('/login#registration?failed=true');
        else {
            userModule.createNewUser(user, function (err) {
                if (err) {
                    res.redirect(500, '/internal_error');
                    console.error(err);
                }

                res.redirect('/login?failed=false');
            });
        }
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    else
        res.redirect('/login');
}

function hasNull(target) {
    for (var member in target) {
        if (target[member] == null || target[member] == '')
            return true;
    }
    return false;
}