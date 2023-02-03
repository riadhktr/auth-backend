const bcrypt = require('bcrypt')
const userSchema = require('../models/user')
const  jwt = require('jsonwebtoken')


exports.register=async(req,res)=>{

    try{
        const {name,email,password} = req.body
        const exist = await userSchema.findOne({email})
        if(exist){ return  res.status(400).send({msg:"this email already existing"})
        }

        const newUser = await new userSchema(req.body)
        const saltRounds = 10 ;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password,salt);
        newUser.password = hash ;
        const payload = {id : newUser._id}
        var token =jwt.sign(payload,process.env.privatekey)
        newUser.save()
        res.status(200).send({msg:"welcome",newUser,token})
    }catch(err){
        res.status(500).send({msg:"you can't register now"})
    }
}

exports.login =async(req,res)=>{

    try{
    const {name,email,password}= req.body
    const exist = await userSchema.findOne({email})
    if(! exist) {return res.status(400).send({msg:"you are not registred yet"})
    }
    const match = await bcrypt.compare(password,exist.password)
    if(! match){return res.status(400).send({msg:"wrong password"})}
    const payload = { id : exist._id}
    var token = jwt.sign(payload, process.env.privateKey);
    res.status(200).send({msg:'you did good welcome ',token,exist})

    }catch(err){

        console.log('login',err)
        res.status(500).send({msg:"u can't login"})
    }
}