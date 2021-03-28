const express = require('express');
const app = express();
const middleware = require('./middleware');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('./database');
const session = require('express-session');
require('dotenv').config();




app.set("view engine","pug");
app.set("views","views")

app.use(session({
    secret:process.env.SESSIONSECRET,
    resave:true,
    saveUninitialized:false
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,"public")));

//Routes
const loginRoute = require('./routes/loginRoutes')
const registerRoute = require('./routes/registerRoutes')

app.use('/login',loginRoute)
app.use('/register',registerRoute)

app.get('/',middleware.requireLogin,(req,res,next) => {

    var payload = {
        pageTitle : "Home",
        userLoggedIn : req.session.user
    }
    res.status(200).render('home',payload);
})

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`server running on port ${port}`))
