const logger = require('../utils/logger');
const userService = require("../service/userService");
var configObj = require('../config/properties/'+process.env.configFile);
module.exports = function(req, res, next) {
    if (!(req.cookies.ssoToken || req.cookies.accessToken)) {
        res.redirect(configObj.endpoint.crp_login_url);
    }
    try {
        userService.validateUser(req, res).then(function(response) {
            logger.info("sso validation response", response);
            next();
        }).catch(function(err) {
            logger.error(`Error while verifying user with ssoToken  ${req.cookies.ssoToken},  accessToken  ${req.cookies.accessToken}`);
            res.redirect(configObj.endpoint.crp_login_url);
        })
    } catch (er) {
        logger.debug(`Error while verifying user with ssoToken  ${req.cookies.ssoToken}, accessToken ${req.cookies.accessToken}  with error: ${er}`)
        res.redirect(configObj.endpoint.crp_login_url)
    }
}
