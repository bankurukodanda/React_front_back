const axios = require("axios");
const configObj = require('../config/properties/'+process.env.configFile);
var endpoints = configObj.endpoint;
const logger = require('../utils/logger');
function userSerivce(){
    this.validateUser = function(req, res) {
        logger.info('api hit for getting updateCriteria url -', endpoints.sso_verify_url);
        return new Promise((resolve, reject) => {
            let token = req.cookies.ssoToken ? req.cookies.ssoToken : req.cookies.accessToken;
            console.log(endpoints.sso_verify_url)
            axios.request({
                    url: endpoints.sso_verify_url,
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Cookie": 'ssoToken=' + token,
                        'com.yatra.tenant.header.tenantId': '1'
                    },
                    data: { 'ssoToken': token }
                })
                .then(function(response) {
                    console.log(response.data);
                    if (response.data.httpCode == 200 && response.data.status) {
                        //logger.info(`Api hit for getPaxDetails response ${JSON.stringify(response.data)}`)
                        resolve(response.data);
                    } else{
                        reject(response.data);
                    }
                }).catch(function(err) {
                    logger.info(`Error while getting getPaxDetails response ${err}`);
                    reject(err);
                })
        })
    }

}
var service = new userSerivce();
module.exports = service;
