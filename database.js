const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set("useNewUrlParser",true)

class Database{

    constructor(){
        this.connect()
    }

    connect(){
        mongoose.connect(process.env.DATABASECONNECTION,{ useUnifiedTopology: true })
         .then(()=>console.log("Database connected successfully"))
         .catch((err)=>console.log("Database cannot connected"+err))
    }
}

module.exports = new Database()