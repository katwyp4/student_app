var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var log = require('./routes/log.route');
var register = require('./routes/register.route');
var calendar = require('./routes/calendar.route');
var menu = require('./routes/menu.route');
var schedule = require('./routes/schedule.route');
var chat = require('./routes/chat.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/log', log);
app.use('/api/register', register);
app.use('/api/schedule', schedule);
app.use('/api/calendar', calendar);
app.use('/api/menu', menu);
app.use('/api/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
