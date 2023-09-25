const express=require("express")
const {UserModel}=require("../model/user.model")
const userRouter= express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
try {
    bcrypt.hash(password, 5, async(err, hash)=> {
      const user = new UserModel({name,email,gender,password:hash})
      await user.save()
      res.status(200).json({msg:"A new user has been register"})
    });
} catch (error) {
    res.status(4000).json({err:error})
}

})





    userRouter.post("/login",async(req,res)=>{
        const {email,password}=req.body
        try {
          const user = await UserModel.findOne({email}) 
          // console.log(user)
          if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
              const token=jwt.sign({userID:user._id,username:user.username }, 'masai',{expiresIn:"11h"})
            
               if(result){
                res.status(200).json({msg:"Login successfull",token})
               }else{
                res.status(200).json({msg:"wrong Credentials"})
               }
            })
           
          }  else{
            res.status(200).json({msg:"wrong Credentials"})
          }
        } catch (err) {
          res.status(400).json({error:err}) 
        }
    })





module.exports={
    userRouter
}





