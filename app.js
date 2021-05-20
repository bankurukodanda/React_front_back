var createError = require('http-errors');
var express = require('express');
var path = require('path');
// const os = require('os');
// const propertiesReader = require('properties-reader');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const winston = require('winston');
const logger = require('./utils/logger');
const handlebars= require('express-handlebars');

var app = express();

app.use(morgan('combined', { "stream": winston.stream.write}));

/** Reading properties based on env */
  try {
    console.log(process.env.NODE_ENV)
    process.env.configFile =  process.env.NODE_ENV +'-properties.js';

    var configProp = require('./config/'+process.env.configFile);
    
    if (!configProp) {
      logger.info(`Error while setting config object`)
      process.exit(1)
    }
    app.set("configObj", configProp);
  } catch (e) {
    logger.error('Issue in reading environment properties ' + e)
    process.exit(1)
  }

const routing = require('./routes/index');

// view engine setup
// view engine setup
app.engine('hbs',handlebars({ 
	extname:'.hbs',
	defaultLayout : 'layout',
	layoutsDir: path.join(__dirname , '/layouts'),
	helpers: {
		toJSON : function(object) {
			return JSON.stringify(object);
		}
  	}
}));
app.set('views', path.join(__dirname ,'/layouts'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("public"));

app.use('/static', express.static(path.join(__dirname, './client/build/static')));

/** Rote for proxy call */
app.use('/', routing);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  logger.info(`Error while setting config object`)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
