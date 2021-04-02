const express = require('express');
const app = express();
const router = express.Router();
const Post = require('../../schemas/PostSchema');
const User = require('../../schemas/UserSchema');

router.get('/',(req,res,next) => {
   Post.find()
    .populate("postedBy")
    .sort({"createdAt":-1})
    .then(results => res.status(200).send(results))
    .catch((error)=>{
        console.log(error);
        res.sendStatus(400);
    })

})

router.post('/',async(req,res,next) => {
  
 if(!req.body.content){
     console.log("Content param is not sent with request");
     return res.sendStatus(400);
    }
   var postData = {
      content:req.body.content,
      postedBy:req.session.user
   }

    Post.create(postData)
     .then(async newPost => {
         newPost = await User.populate(newPost,{path : "postedBy"})
         res.status(200).send(newPost);
     })
     .catch(error=>{
         console.log(error);
         res.sendStatus(400);
     })
})

router.put('/:id/like',async(req,res,next) => {
    var postId = req.params.id;
    var userId = req.session.user._id;
    var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);
    
    res.status(200).send("hii");
    
   })
   
module.exports = router;