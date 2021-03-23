const express = require('express');
const app = express();

app.set("view engine","pug");
app.set("views","views")

app.get('/',(req,res)=>{
    res.status(200).render('home');
})

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`server running on port ${port}`))
