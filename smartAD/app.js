/*
 Default module
*/
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const indexRouter = require('./routes/index');

app.use((req, res, next) => {
  res.r = (result) => {
      res.json({
          status: true,
          message: "success",
          result,
      });
  };
  next();
});
/*
 Custom module
*/
const routes = require('./routes/routes');
const index = require('./routes/index');
/*
 app.set
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/*
 app.use
*/
app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
      res.send(200);
  } else {
      next();
  }
};
app.use(allowCrossDomain);

// app.use('/', indexRouter);
app.use('/',routes);

// error handler
require('./ErrorHandler')(app);

app.use(function(req, res, next)
{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next)
{
  res.locals.message = err.message;
  // console.log("res.locals.message error : " + res.locals.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // console.log("res.locals.error error : " + res.locals.error);

  res.status(err.status || 500);
  res.render('error',{errLog : res.locals.error});
});

module.exports = app;