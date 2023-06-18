const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Create a variable called isProduction that will be true 
// if the environment is in production or 
// not by checking the environment key in the configuration file (backend/config/index.js):
const { environment } = require('./config');
const isProduction = environment === 'production';

//Initialize the Express application:
const app = express();

//Connect the morgan middleware for logging information
//about requests and responses:
app.use(morgan('dev'));

// Add the cookie-parser middleware for parsing cookies and
//  express.json middleware for parsing JSON bodies of requests 
//  with Content-Type of "application/json".
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

// backend/app.js
const routes = require('./routes');

//...

app.use(routes); // Connect all the routes 需要在所有的error handler之前define

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

// backend/app.js
// ...
const { ValidationError } = require('sequelize');
// ...
// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            // errors[error.path] = error.message;
            switch (error.message) {

                case 'usernameNotUnique':
                    err.message = "User already exists";
                    errors[error.path] = "User with that username already exists";
                    err.status = 500;
                    break;

                case 'emailNotUnique':
                    err.message = "User already exists";
                    errors[error.path] = "User with that email already exists";
                    err.status = 500;
                    break;
            }
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});
// backend/app.js
// ...
// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});

module.exports = app;