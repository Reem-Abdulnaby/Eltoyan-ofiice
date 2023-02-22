const Admin=require('../model/admin')
const jwt=require('jsonwebtoken')

const auth=async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decode=jwt.verify(token,"PROJECT")
        const admin= await Admin.findOne({_id:decode._id,tokens:token})
        if(!admin){
            throw new Error('NOT AUTHORIZED !!')
        }
        req.admin=admin
        req.token=token
        next()
    }
    catch(e){
        res.status(401).send("Please Authenticate !!")
    }

}
module.exports=auth