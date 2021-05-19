const pckg = require('../package.json');
let request_headers={
    "Accept": "application/json",
    "Content-Type": "application/json"
}
module.exports = {
    "appName":pckg.name,
    "port":7070,
    "context": "/samp",
    "endpoint":{
        "/getCites":{
            "url": "http://demo6116549.mockable.io/Test",
            "method":"POST",
            "headers": request_headers,
           // "data": '{"attributeRequest":[{"key":"name","operator":"EQUALS","values":[]}],"attributes":["id","name","type","aliases",{"descendants":{"type":"City"}}]}',
        },
    }
}
