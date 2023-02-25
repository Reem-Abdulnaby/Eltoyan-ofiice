const express=require('express')
const router=express.Router()
const NewsLetter=require('../model/newsLetter')
router.get('/news/getall',async(req,res)=>{
    try{
        const newsLetter= await NewsLetter.find()
        res.status(200).send(newsLetter)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
module.exports=router