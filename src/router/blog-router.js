const express=require('express')
const router=express.Router()
const Blog=require('../model/blogs')
router.get('/blog/all',async(req,res)=>{
    try{
        const blog=await Blog.find({})
        res.status(200).send(blog)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
router.get('/blog/getbyid/:id',async(req,res)=>{
    try{
        const blogId=req.params.id
        const blog=await Blog.findById({_id:blogId})
        if(!blog){
            return res.status(404).send('not found')
        }
        res.status(200).send(blog)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
module.exports=router