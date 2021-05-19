const winston = require('winston');
const os = require('os');
const path = require('path');
const fs = require('fs'); 
const packageJson = require('../package.json');
var date = Date(Date.now()); 

// fetching application name from json
const appName = packageJson.name;

// create application specific dir for application log
if(!fs.existsSync(path.join(os.homedir(), 'YT'))){
    fs.mkdirSync(path.join(os.homedir(), 'YT'));
    fs.mkdirSync(path.join(os.homedir(), 'YT', 'var'));
    fs.mkdirSync(path.join(os.homedir(), 'YT', 'var','log'));
} else if(!fs.existsSync(path.join(os.homedir(), 'YT', 'var'))){
    fs.mkdirSync(path.join(os.homedir(), 'YT', 'var'));
    fs.mkdirSync(path.join(os.homedir(), 'YT', 'var','log'));
} else if (!fs.existsSync(path.join(os.homedir(), 'YT', 'var', 'log'))) {
    fs.mkdirSync(path.join(os.homedir(), 'YT', 'var', 'log'));
}

// path of logger file dir
var logDir = path.join(os.homedir(), 'YT', 'var', 'log')
var now = new Date();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { time: date.toString() },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new (require('winston-daily-rotate-file'))({
           filename: `${logDir}/${appName}-error.log`,
           level: 'error',
        }),
      new (require('winston-daily-rotate-file'))({ 
          filename: `${logDir}/${appName}.log` 
        })
    ]
  });
   
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 
 /* if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }
  */
  module.exports = logger;