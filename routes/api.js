var express = require('express');
var request = require('request');
var querystring = require('query-string');
var jsdom = require("jsdom");
var body = require('body-parser');
var iconv  = require('iconv-lite');
var requestPromise = require('request-promise');
var router = express.Router();
const apiKey = "AIzaSyAMX-yLiA4twc0Uxv4zJBorKGvjPYFOsTA";
const { JSDOM } = jsdom;

router.get('/', function(req, res, next) {
    res.json({statusCode: "ERROR", notifyType: 'error', headerText: 'Error connecting API!', outputText: "Invalid Request."});
});

router.post('/', function(req, res) {
  if(req.method == "POST"){
    var uid = req.body.uid;
    var std_id = req.body.std_id;
    var version = req.body.version;
      
    var newVer = "1.0.0";
    function isNewerVersion (oldVer, newVer) {
      const oldParts = oldVer.split('.')
      const newParts = newVer.split('.')
      for (var i = 0; i < newParts.length; i++) {
        const a = ~~newParts[i] // parse int
        const b = ~~oldParts[i] // parse int
        if (a > b) return true
        if (a < b) return false
        if (a = b) return true
      }
      return false
    }
    
    if(uid && std_id){
      var form = {
        inputBox: std_id
      };
    
      var formData = querystring.stringify(form);
      var contentLength = formData.length;
      const options = {
        method: 'POST',
        uri: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + apiKey,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          idToken: uid
        },
        json: true
      };

      if(isNewerVersion(newVer, version)){
          res.json({statusCode: "SUCCESS", notifyType: 'success', headerText: 'สำเร็จ', outputText: "ลงชื่อสำเร็จ"});
          /*requestPromise(options).then(function (parsedBody) {
            request({
              headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36'
              },
                uri: 'http://ict.lks.ac.th/public/stamp/studentstamp_prc.php',
                body: formData,
                method: 'POST',
                encoding: null
              }, function (error, response, body) {
                if(!error){
                  body = iconv.decode(new Buffer(body), "TIS-620");
                  const dom = new JSDOM(body, { includeNodeLocations: true });
                  try {
                    res.json({statusCode: "SUCCESS", notifyType: 'success', headerText: 'สำเร็จ', outputText: "ลงชื่อสำเร็จ"});
                  }catch{
                    res.json({statusCode: "ERROR", notifyType: 'error', headerText: 'ไม่สำเร็จ', outputText: "ไม่พบข้อมูล!"});
                  }
                }else{
                  res.json({statusCode: "ERROR", notifyType: 'error', headerText: 'Error connecting API!', outputText: "Please contact webmaster."});
                }
            });
          }).catch(function (err) {
            res.json({statusCode: "ERROR", notifyType: 'error', headerText: 'Error connecting API!', outputText: "Unauthorize"});
          });*/
      }else{
          res.json({statusCode: "ERROR", notifyType: 'error', headerText: 'Application is too old!', outputText: "Please update your app."});
      }
    }else{
      res.json({statusCode: "ERROR", notifyType: 'ERROR', headerText: 'Error connecting API!', outputText: "uid and std_id must fill in."});
    }
  }else{
    res.json({statusCode: "ERROR", notifyType: 'ERROR', headerText: 'Error connecting API!', outputText: "Invalid Request."});
  }
});

module.exports = router;
