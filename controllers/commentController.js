// wiki.js - Wiki route module

var express = require('express');
var router = express.Router();

const Comment = require("../models/Comments.js");

// Home page route
router.get('/', function(req, res) {
    res.send('Comment home page');
}); //


router.post("/addcomment", (req, res) => {

    let commentData = req.body;

    let comment = new Comment(commentData);

    comment
        .save()
        .then(doc => {
            res.status(200).json({ success: true, data: doc._id });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err });
        });


});

router.post("/getallcomments",(req,res) =>{

  Comment.find({},(err,comments) => {

    if (err) {
        res.json({ "success": false,"errorCode":2, "error": err })
    } else {
        if(comments == null){
          res.json({ "success": false,"errorCode":3, "error": "no record found" })
        }else{
          res.json({ "success": true,"data": comments })
        }
    }

  })

});//


router.post("/getcomment",(req,res) => {

  let commentId = req.query.id;

  Comment.findOne({ "_id": commentId },  (err, comment) => {

      if (err) {
          res.json({ "success": false,"errorCode":2, "error": err })
      } else {
          if(comment == null){
            res.json({ "success": false,"errorCode":3, "error": "no record found" })
          }else{
            res.json({ "success": true,"data": comment })
          }
      }

  }) //

});//





module.exports = router;
