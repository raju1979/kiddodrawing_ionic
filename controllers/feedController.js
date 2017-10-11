// wiki.js - Wiki route module

var express = require('express');
var router = express.Router();

const CryptoJS = require("crypto-js");
const nJwt = require('njwt');
const secureRandom = require('secure-random');
const moment = require('moment');
var mongoose = require('mongoose');

const privateKey = 'x_#@dndfhj^%';

const User = require("../models/Users");
const Feed = require("../models/Feeds.js");

const errorCodes = {
  "serverError":2,
  "jwtUnverified":3,
  "recordNotFound":4
}

// Home page route
router.get('/', function(req, res) {
    res.send('Feed home page');
})

router.post("/addfeed", (req, res) => {

  let feedData = JSON.stringify(req.body);

  let feedDataFinal = JSON.parse(feedData);

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(decodeURIComponent(feedDataFinal.data), privateKey);
  var feedPlainData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let userId = feedPlainData.createdBy;
  let token = feedPlainData.userToken;

  User.findOne({'_id': userId},(err,user) => {
    if(err){
      res.json({ "success": false,"errorCode":errorCodes.serverError, "error": err })
    }else{
      if(user == null){
        res.json({ "success": false,"errorCode":errorCodes.recordNotFound, "error": err })
      }else{
        let feedData = feedPlainData;
        delete feedData["userToken"]
        let feed = new Feed(feedData);
        feed
            .save()
            .then(doc => {
                res.status(200).json({ success: true, data: doc._id });
            })
            .catch(err => {
                res.status(500).json({ success: false,"errorCode":errorCodes.serverError, error: err });
            });
      }
    }
  })//end User.findOne


    // let feed = new Feed(feedData);
    //
    // console.log(compressedImgString.toString());
    //
    //
    //
    // feed
    //     .save()
    //     .then(doc => {
    //         res.status(200).json({ success: true, data: doc._id });
    //     })
    //     .catch(err => {
    //         res.status(500).json({ success: false, error: err });
    //     });


});

router.get("/getfeed", (req, res) => {

    let feedId = req.query.feedid;

    console.log(feedId);

    Feed.findOne({ "_id": feedId },  (err, feed) => {

        if (err) {
            res.json({ "success": false,"errorCode":2, "error": err })
        } else {
            if(feed == null){
              res.json({ "success": false,"errorCode":3, "error": "no record found" })
            }else{
              res.json({ "success": true,"data": feed })
            }
        }

    }) //


}); //

router.post("/feedlist",(req,res) => {

  let feedRequestRaw = req.body;

  let feedId = feedRequestRaw.id;
  let limit = feedRequestRaw.limit;

  fetchFeedsList(feedId,limit).then((data) => {
    res.json(data);
  })

});//


function fetchFeedsList(id=0,limit=2) {
  // return new Promise(resolve => setTimeout(() => resolve("theValue"), 2000));
  return new Promise((resolve) =>
    //  setTimeout(() => resolve("theValue"), 2000)
    {
      if(id == 0){
        // Feed.find({}).limit(limit)
        Feed.aggregate([
          {
                "$lookup":
                  {
                    "from": "users",
                    "localField": "createdBy",
                    "foreignField": "_id",
                    "as": "userData"
                  }
          },{
              $unwind: "$userData"
          },
          {
            "$lookup":
              {
                "from": "comments",
                "localField": "_id",
                "foreignField": "feedId",
                "as": "commentData"
              }
          },
          {
            $project:{
              "userData.password":0,
              "userData.signkey":0,
              "userData.location":0,
              "userData.dob":0,
              "userData.updatedAt":0,
              "userData.createdAt":0,
            }
          },
          { $limit : limit }
          ])
          .exec((err,feeds) => {
            if(err){
              resolve({ "success": false,"errorCode":2, "error": err })
            }else{
              if(feeds == null){
                resolve({ "success": false,"errorCode":3, "error": "no record found" })
              }else{
                console.log()
                resolve({ "success": true,"data": feeds })
              }
            }
          });//Feed.find({'_id':{'$gt':id}}).limit(limit)
      }else{
        Feed.aggregate([
          { "$match": { "_id": {'$gt':new mongoose.Types.ObjectId(id)} } },
          {
                "$lookup":
                  {
                    "from": "users",
                    "localField": "createdBy",
                    "foreignField": "_id",
                    "as": "userData"
                  }
          },{
              $unwind: "$userData"
          },
          {
            "$lookup":
              {
                "from": "comments",
                "localField": "_id",
                "foreignField": "feedId",
                "as": "commentData"
              }
          },
          {
            $project:{
              "userData.password":0,
              "userData.signkey":0,
              "userData.location":0,
              "userData.dob":0,
              "userData.updatedAt":0,
              "userData.createdAt":0,
            }
          },
          { $limit : limit }
          ])
          .exec((err,feeds) => {
            if(err){
              resolve({ "success": false,"errorCode":2, "error": err })
            }else{
              if(feeds == null){
                resolve({ "success": false,"errorCode":3, "error": "no record found" })
              }else{
                resolve({ "success": true,"data": feeds })
              }
            }
          })
      }

    }
  );//end promise
}


module.exports = router;
