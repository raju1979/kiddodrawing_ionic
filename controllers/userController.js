// wiki.js - Wiki route module

const express = require('express');
const router = express.Router();

const CryptoJS = require("crypto-js");

const nJwt = require('njwt');
const secureRandom = require('secure-random');
const moment = require('moment');

const User = require("../models/Users");
const Feed = require("../models/Feeds");

const privateKey = 'x_#@dndfhj^%';

const isMomHappy = false;

var mongoose = require('mongoose');



const errorCodes = {
  "serverError":2,
  "jwtUnvarified":3,
  "dataNotFound":4
}

// Home page route
router.get('/', function(req, res) {
  res.send('Wiki home page');
})


router.post("/getuser", (req, res) => {


  let userData = req.body;
  let userId = userData.id;


  User.findOne({"_id": userId}, (err, user) => {

    if (err) {
      res.json({"success": false,"errorCode": errorCodes.serverError,"error": err})
    } else {
      if (user == null) {
        res.json({"success": false,"errorCode": errorCodes.jwtUnvarified,"error": "no record found"})
      } else {
        res.json({
          "success": true,"data": user})
      }
    }

  })
}); //

router.post("/login", (req, res) => {

  let userData = JSON.stringify(req.body);

  let UserDataFinal = JSON.parse(userData);

  // Decrypt
  let bytes = CryptoJS.AES.decrypt(decodeURIComponent(UserDataFinal.data), privateKey);
  let userPlainData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let hashPass = CryptoJS.MD5(userPlainData.password).toString();

  let signingKey = secureRandom(256, {
    type: 'Buffer'
  }); // Create a highly random byte array of 256 bytes
  let base64SigningKey = signingKey.toString('base64');


  User.findOne({"email": userPlainData.email,"password": hashPass}, '_id name dob email location signkey', (err, user) => {
    if (err) {
      res.json({"success": false,"errorCode": errorCodes.serverError,"error": err})
    } else {
      if (user == null) {
        res.json({"success": false,"errorCode": errorCodes.dataNotFound,"error": "no record found"})
      } else {
        user.signkey = base64SigningKey;
        user.save();
        var jwtData = generateJWTToken(user.signkey, user._id);

        let retData = {
          id: user._id,
          dob: user.dob,
          name: user.name,
          location: user.location,
          email: user.email,
          token: jwtData.token
        }

        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(retData), privateKey);

        res.json({success: true,data: encodeURIComponent(ciphertext)});

      }
    }

  }); //end User.findOne

}); //end router.post("/login"

router.post("/register", (req, res) => {

  let userData = JSON.stringify(req.body);

  let UserDataFinal = JSON.parse(userData);

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(decodeURIComponent(UserDataFinal.data), privateKey);
  var userPlainData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let hashPass = CryptoJS.MD5(userPlainData.password).toString();


  userPlainData.password = hashPass;

  let user = new User(userPlainData);
  user
    .save()
    .then(doc => {
      res.json({success: true,data: doc});
    })
    .catch(err => {
      res.json({"success": false,"errorCode": errorCodes.serverError,"error": err})
    });
}); //

router.post("/getusers", (req, res) => {

  let userData = JSON.stringify(req.body);
  let userDataFinal = JSON.parse(userData);

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(decodeURIComponent(userDataFinal.data), privateKey);
  var userPlainData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let token = userPlainData.token;
  let userId = userPlainData.id;

  User.findOne({
    '_id': userId
  }, 'signkey', (err, userkey) => {
    if (err) {
      res.json({"success": false,"errorCode": errorCodes.serverError,"error": err})
    } else {
      if (userkey == null) {
        res.json({"success": false,"errorCode": errorCodes.dataNotFound,"error": "no record found"})
      } else {
        signkey = userkey.signkey;
        nJwt.verify(token, signkey, function(err, verifiedJwt) {
          if (err) {
              res.json({"success": false,"errorCode": errorCodes.jwtUnvarified,"error": "no record found"}) // Token has expired, has been tampered with, etc
          } else {
            // res.send(verifiedJwt); // Will contain the header and body
            User.find({},{signkey:0,password:0},(err,users) => {
              if(err){
                res.json({"success": false,"errorCode": errorCodes.serverError,"error": err});
              }else{
                if(users == null){
                  res.json({"success": false,"errorCode": errorCodes.dataNotFound,"error": "no record found"})
                }else{
                  res.json({"success": true,"data": users});
                }
              }
            })

          }
        });//end nJwt.verify

      }//end else if (userkey == null)
    }//end else if (err)

  })//end User.findOne

}); //end router.post("/login"

router.post("/getuserfeeds", (req, res) => {

  let userData = JSON.stringify(req.body);
  let userDataFinal = JSON.parse(userData);

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(decodeURIComponent(userDataFinal.data), privateKey);
  var userPlainData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let userId = userPlainData.id;
  let token = userPlainData.token;

  //console.log(userId,token);

  User.findOne({'_id': userId},(err,user) => {
    if(err){
      res.json({"success": false,"errorCode": errorCodes.serverError,"error": err});
      //res.json({"success":false,"errorCode":2,"reason":err})
    }else{
      if(user == null){
        res.send("some error no user");
        //res.json({"success":false,"errorCode":3,"reason":"no record found"})
      }else{
          validateJWT(token,user.signkey).then((value) => {
            if(value == false){
              res.json({"success": false,"errorCode": errorCodes.jwtUnvarified,"error": "jwtUnvarified"})
            }else{
              var id = mongoose.Types.ObjectId();
              console.log(id)
              Feed.aggregate([
                {$match:{"createdBy":new mongoose.Types.ObjectId(userId)}},
                {
                      "$lookup":
                        {
                          "from": "comments",
                          "localField": "_id",
                          "foreignField": "feedId",
                          "as": "feedComment"
                        }
                   }
                ]).exec(function(err, results){
                    if(err){
                      res.json({"success": false,"errorCode": errorCodes.serverError,"error": err});
                    }else{
                      if(results == null){
                        res.json({"success": false,"errorCode": errorCodes.dataNotFound,"error": "no record found"})
                      }else{
                        res.json({"success": true,"data": results});
                      }
                    }
                 })


            }//end else
          })

      }
    }
  });//end User.findOne


}); //end router.post("/login"



function generateJWTToken(signingKey, userId) {

  var claims = {
    iss: "https://hybridappwala.com/", // The URL of your service
    sub: userId, // The UID of the user in your system
    scope: "user"
  };

  var jwt = nJwt.create(claims, signingKey);

  var today = moment();

  var new_date = moment(moment()).add('days', 6);
  var expiryEpochmoment = (moment(new_date).unix() * 1000)

  jwt.body.exp = expiryEpochmoment;

  var token = jwt.compact();

  return ({
    "token": token
  })

};//

router.post("/validatetoken",(req,res) => {

  let userData = JSON.stringify(req.body);
  let userDataFinal = JSON.parse(userData);

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(decodeURIComponent(userDataFinal.data), privateKey);
  var userPlainData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let userId = userPlainData.id;
  let token = userPlainData.token;

  User.findOne({'_id': userId},(err,user) => {
    if(err){
      res.json({"success": false,"errorCode": errorCodes.serverError,"error": err});
      //res.json({"success":false,"errorCode":2,"reason":err})
    }else{
      if(user == null){
        res.json({"success": false,"errorCode": errorCodes.jwtUnvarified,"error": "jwtUnvarified"})
        //res.json({"success":false,"errorCode":3,"reason":"no record found"})
      }else{
          validateJWT(token,user.signkey).then((value) => {
            if(value == false){
              res.json({"success": false,"errorCode": errorCodes.jwtUnvarified,"error": "jwtUnvarified"})
            }else{
              res.json({"success":true})
            }//end else
          })

      }
    }
  });//end User.findOne
});//

function validateJWT(token, signkey) {
  // return new Promise(resolve => setTimeout(() => resolve("theValue"), 2000));
  return new Promise((resolve) =>
    //  setTimeout(() => resolve("theValue"), 2000)
    {
      nJwt.verify(token, signkey, (err, verifiedJwt) => {
        if (err) {
          console.log("no jwt found")
          resolve(false);
        }else{
          console.log("jwt found")
          resolve(true);
        }

      });
    }
  );//end promise
}


module.exports = router;
