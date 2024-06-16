var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//mongoDB
var mongoose = require('mongoose')

//auth
const { v4: uuidv4 } = require('uuid')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

// passport config
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//routes
var indexRouter = require('./routes/index');
var ucRouter = require('./routes/uc');
var userRouter = require('./routes/user');

var app = express();
//generacion de id
app.use(session({
  genid: req => {
    return uuidv4()
  },
  secret: 'ew2024',
  resave: false,
  saveUninitialized: true
}))

//mongoDB
var mongoDB = 'mongodb://127.0.0.1:62892/projeto'
mongoose.connect(mongoDB)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB'))
db.once('open', () => {
  console.log("Conexão ao MongoDB realizada com sucesso")
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//authenticacion
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/uc', ucRouter);
app.use('/user',userRouter);

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
