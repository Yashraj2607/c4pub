const jwt = require("jsonwebtoken")
// const { blacklist } = require("../blacklist")

const auth = (req,res,next)=>{
const token = req.headers.authorization
if(token){
    // if(blacklist.includes(token)){
    //     res.send({"msg":"Please Login again"})
    // }
    jwt.verify(token,"masai",(err,decoded)=>{
        if(decoded){
        req.body.userID=decoded.userID
        req.body.username=decoded.username
            next()
           
        }else{
            res.send({"error":err})
        }
    })
}else{
    res.send({"msg":"You are not authorised"})
}
}

module.exports={
    auth
}