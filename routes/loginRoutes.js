const express = require('express');
const app = express();
const router = express.Router();
const User = require('../schemas/UserSchema');
const bcrypt = require('bcrypt');

app.set("view engine","pug");
app.set("views","views")

router.get('/',(req,res,next) => {

    var payload = {
        pageTitle : "Login"
    }

    res.status(200).render('login',payload);
})

router.post('/',async(req,res,next) => {
var payload = req.body;
 if(req.body.logUsername && req.body.logPassword)
 {
    const user = await User.findOne({
        $or :[
            {email : req.body.logUsername},
            {username : req.body.logUsername}
        ]
       })
         .catch((error)=>{
         console.log(error);
         payload.errorMessage = "Something went wrong" 
    res.status(200).render('login',payload)
     })

     if(user != null){
         var result = await bcrypt.compare(req.body.logPassword,user.password);
         if(result === true){
             req.session.user = user;
             return res.redirect('/');
           }
        }
    payload.errorMessage = "Incorrect Username or Password";
    return res.status(200).render('login',payload)
 }
   payload.errorMessage = "Make sure each fields has a valid value";
    return res.status(200).render('login',payload)
})

module.exports = router;