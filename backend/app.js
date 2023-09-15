var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require("body-parser")

var authRouter = require('./routes/auth.router');
const db = require('./config/connection');

var app = express();

db.connect(function (err) {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('db connected');
        console.log(`server running on ${process.env.server}`);
    }
});
var corsOptions = {
    origin: 'http://localhost:5173', // Replace with the appropriate origin
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

// Use the cors middleware with the specified options
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);

module.exports = app;
