// app/models/user.js
// load the things we need
//var bcrypt   = require('bcrypt-nodejs');
var http = require('http');
// define the schema for our user model
var mysql = require('mysql');
var passport = require('passport');

var user = {
    user_id: '',
    email: '',
    password: '',
    first_name: '',
    last_name: ''
};

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node',
});

// checking if password is valid
user.validateUserNameAndPassword = function (email, password, done) {


    try {
        connection.query('SELECT * from users where email="' + email + '"and password="' + password + '"', function (err, rows, fields) {
            if (rows.length > 0) {

                user = rows[0];
                console.log("User : " + user.email + ", " + user.password + ", " + user.first_name + ", " + user.last_name + ", " + user.user_id);
                //serialize the query result save whole data as session in req.user[] array  
                passport.serializeUser(function (user, done) {
                    done(null, user);
                });

                passport.deserializeUser(function (id, done) {
                    done(null, user);

                });
                return done(null, user);
            } else {
                return done(null, false);
            }
        });

    } catch (err) {
        console.log("Authentication Error : " + err);
    }
    //return flag;

};


// 1 - try / catch doesn't work with async codes, so you don't need to use
// 2 - You need to add a callback to be trigered when everything had run
user.createNewUser = function(user, callback) { 
    connection.query('INSERT INTO users (email, first_name, last_name, password) VALUES ("'+user.email+'", "'+user.first_name+'", "'+user.last_name+'", "'+user.password+'")' , function(err, result) {
        // We will pass the error and the result to the function
        callback(err, result);
    });
};

module.exports = user;


