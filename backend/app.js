var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
