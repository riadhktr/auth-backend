const mongoose = require('mongoose')

exports.connectDB = async()=>{
try{
await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true })
console.log('you are connected to the database')
}catch(err){

    console.log('connectDb',err)
}
    
}
