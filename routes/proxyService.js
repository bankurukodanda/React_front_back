var express = require('express');
const axios = require("axios");
const https = require('https');
var router = express.Router();
var configProp = require('../config/'+process.env.configFile);

/* GET Proxy listing. */
router.get('*', (req, res) =>{
  /*if(req.headers.csrf_token){
      if(req.headers.csrf_token != req.cookies.csrf){
          res.status(200).send("Invalid Request");
      }
  } else{
      res.status(200).send("Invalid Request");
  }*/
  
  
  let request={
      "method": "GET",
      "url":"",
      "headers":{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      "query":{},
      "data":{}
  }

  if(!configProp.endpoint[req.path]){
      res.status(404).send("Service not available");
  } else{

      let endpoint = configProp.endpoint[req.path];
      
      request.url = endpoint.url;
      request.method = endpoint.method;
      request.headers = endpoint.headers;
      request.data = endpoint.data;
      
      if(req.body){
          if(req.body.params){
              if(req.body.params.path){
                  let pathParams = req.body.params.path;
                  if(pathParams.length){
                      pathParams.forEach(element => {
                          request.url = request.url + '/'+ element;
                      });
                  }
              }
              if(req.body.params.query){
                  let queryParams = req.body.params.query;
                  if(Object.keys(queryParams).length){
                      var i=0;
                      for (let key in queryParams) {
                          if(i==0){
                              request.url = request.url + '?'+ key + '=' + queryParams[key];
                          } else{
                              request.url = request.url + '&'+ key + '=' + queryParams[key];
                          }
                          i++;
                      }
                  }
              }
              if(req.body.headers){
                  let headers = req.body.headers;
                  if(Object.keys(headers).length){
                      for (let key in headers) {
                          request.headers[key] = headers[key]
                      }
                  }
              }
          }
          if(req.body.data){
              request.data = req.body.data;
          }
      }
      if(req.cookies && req.cookies.accessToken || req.cookies.ssoToken ){
          //request.headers.Cookie = req.cookies.ssoToken ? "ssoToken=" + req.cookies.ssoToken : "ssoToken=" + req.cookies.accessToken;
          request.headers.Cookie = req.cookies.ssoToken ? "ssoToken=" + req.cookies.ssoToken : "accessToken=" + req.cookies.accessToken;
      }
      
      axios({
          url: request.url,
          method: request.method,
          headers: request.headers,
          data: request.data,
          httpsAgent: new https.Agent({ rejectUnauthorized: false })
      }).then(function(response){
        
          if(response && response.status === 200 && response.data){
              res.send(response.data);
          }
      }).catch(function(error){
        
          errorResponse= JSON.parse(circularJson.stringify(error));
          logger.info(`Error while getting header response ${errorResponse}`);
          if(errorResponse.response){
              console.log(errorResponse.response);
              res.send(errorResponse.response);
          } else{
              console.log(errorResponse);
              res.send(JSON.parse(circularJson.stringify(errorResponse)));
          }
      });

  }
});
module.exports = router;
