const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    
    if(!authorization){
      return res.status(401).send.json({error:"You must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,paylaod)=>{
        if(err){
           return res.status(401).json({err:"oyu must be logged in"})
        }
        
        const {_id} = paylaod
        User.findById(_id).then(userdata=>{
            req.user = userdata
        })
        next()
    })

}