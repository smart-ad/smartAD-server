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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// app.use('/', indexRouter);
app.use('/',routes);
app.use('/main',index);
function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
      res.status(204).json({nope: true});
    } else {
      next();
    }
  }

app.use(ignoreFavicon);

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
  console.log("res.locals.message error : " + res.locals.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("res.locals.error error : " + res.locals.error);
  console.log()
  res.status(err.status || 500);
  res.render('error',{errLog : res.locals.error});
});

module.exports = app;
