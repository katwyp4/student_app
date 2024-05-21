var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Import tras
var log = require('./routes/log.route');
var register = require('./routes/register.route');
var calendar = require('./routes/calendar.route');
var menu = require('./routes/menu.route');
var schedule = require('./routes/schedule.route');
var chat = require('./routes/chat.route');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions));

// Używanie tras
app.use('/api/log', log);
app.use('/api/register', register);
app.use('/api/schedule', schedule);
app.use('/api/calendar', calendar);
app.use('/api/menu', menu);
app.use('/api/chat', chat);

// Obsługa błędów 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Obsługa błędów
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
