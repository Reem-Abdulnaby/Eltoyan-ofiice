const express=require('express')
const router=express.Router()
const Info=require('../model/information')
router.get('/info/:id',async(req,res)=>{
    try{ const infoId=req.params.id
     const info= await Info.findById({_id:infoId})
     res.status(200).send(info)
 }
 catch(e){
     res.status(400).send(e.message)
 }
 
 })
 module.exports=router