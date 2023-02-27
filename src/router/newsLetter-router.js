const express=require('express')
const router=express.Router()
const NewsLetter=require('../model/newsLetter')
router.post('/news/add',async(req,res)=>{
    try{
        const newsLetter= new NewsLetter(req.body)
        await newsLetter.save()
        res.status(200).send(newsLetter)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
module.exports=router