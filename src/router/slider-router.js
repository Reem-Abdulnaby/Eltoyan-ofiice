const express=require('express')
const router=express.Router()
const Slider=require('../model/slider')
router.get('/slider/all',async(req,res)=>{
   try{
    const slider=await Slider.find({})
    res.status(200).send(slider)
   }
   catch(e){
    res.status(400).send(e.message)
   }
})
module.exports=router