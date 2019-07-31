/*
 Default module
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
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
/*
 app.set
*/
app.set('views', path.join(__dirname, './views/'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname, './views/'));
/*
 app.use
*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/', indexRouter);
app.use('/',routes);
function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
      res.status(204).json({nope: true});
    } else {
      next();
    }
  }

app.use(ignoreFavicon);
app.use('/', routes);
// error handler
require('./ErrorHandler')(app);

app.use(function(req, res, next)
{
  var err = new Error('Not Found');
  err.status = 404;
  err.path = req.path;
  log.error(err);
  next(err);
});

// Error handler
app.use(function(err, req, res, next)
{
  res.locals.message = err.message;
  console.log("res.locals.message error : " + res.locals.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("res.locals.error error : " + res.locals.error);

  res.status(err.status || 500);
  res.render('error',{errLog : res.locals.error});
});

module.exports = app;

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var indexRouter = require('./routes/index.js');
// var usersRouter = require('./routes/users.js');
// var cors = require('cors');
// var app = express();
// var bodyParser = require('body-parser');
// app.use((req, res, next) => {
//   res.r = (result) => {
//       res.json({
//           status: true,
//           message: "success",
//           result,
//       });
//   };
//   next();
// });
// /*
//  Custom module
// */
// const routes = require('./routes/routes.js');

// /*
//  app.set
// */
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');

// /*
//  app.use
// */
// app.use(logger('dev'));
// app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use('/',routes);


// // error handler
// require('./ErrorHandler')(app);

// app.use(function(req, res, next)
// {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // Error handler
// app.use(function(err, req, res, next)
// {
//   res.locals.message = err.message;
//   // console.log("res.locals.message error : " + res.locals.message);
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // console.log("res.locals.error error : " + res.locals.error);

//   res.status(err.status || 500);
//   res.render('error',{errLog : res.locals.error});
// });

// module.exports = app;


// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
