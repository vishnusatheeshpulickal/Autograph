const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

app.use(bodyParser.urlencoded({ extended: false }))

app.set("view engine","pug");
app.set("views","views")

router.get('/',(req,res,next) => {

    var payload = {
        pageTitle : "Register"
    }

    res.status(200).render('register',payload);
})

router.post('/',async(req,res,next)=>{
 
    let firstName = req.body.firstName.trim();
    let lastName = req.body.lastName.trim();
    let username = req.body.username.trim();
    let email = req.body.email.trim();
    let password = req.body.password;
    var payload = req.body;

  if(firstName && lastName && username && email && password){
    const user = await User.findOne({
      $or: [{username:username},{email:email}]
        })
        .catch((error)=>{
          console.log(error);
          payload.errorMessage = "Something went wrong.";
          res.status(200).render('register',payload)
        });

        if(user == null)
        {
          //User not found
          const data = req.body;
          data.password = await bcrypt.hash(password,12);
            User.create(data)
             .then((user) => {
               req.session.user = user;
               return res.redirect('/');
             });
        }
        else{
          // User found
          if(email === user.email)
          {
            payload.errorMessage = "Email already in use.";
          }
          else{
            payload.errormessage = "Username already in use."
          }
          res.status(200).render('register',payload)
        }
  }
  else{
    payload.errorMessage = "* Make sure each field has a valid value.";
    res.status(200).render('register',payload)
  }

})


module.exports = router;