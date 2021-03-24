const express = require('express');
const app = express();
const middleware = require('./middleware');

app.set("view engine","pug");
app.set("views","views")

//Routes
const loginRoute = require('./routes/loginRoutes')
app.use('/login',loginRoute)

app.get('/',middleware.requireLogin,(req,res,next) => {

    var payload = {
        pageTitle : "Home"
    }
    res.status(200).render('home',payload);
})

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`server running on port ${port}`))
