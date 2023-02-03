const express = require('express')
const cors =require('cors');
const { connectDB } = require('./config/connectDb');
const userRoutes = require('./routes/user');
const app = express()
require('dotenv').config()
const port = process.env.PORT;

app.use(express.json())
app.use(cors())
app.use('/profile',userRoutes)
connectDB()




app.listen(port,(err)=>{
    (err)? console.log(err): console.log(`go to port : ${port}`)
})