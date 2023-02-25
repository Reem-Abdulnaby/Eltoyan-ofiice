const express=require('express')
const router=express.Router()
const Contact=require('../model/contact')

router.get('/contact/:id',async(req,res)=>{
   try{ const contactId=req.params.id
    const contact= await Contact.findById({_id:contactId})
    res.status(200).send(contact)
}
catch(e){
    res.status(400).send(e.message)
}

})
router.get('/contactt/all',async(req,res)=>{
    try{ 
     const contact= await Contact.find()
     res.status(200).send(contact)
 }
 catch(e){
     res.status(400).send(e.message)
 }
 
 })
module.exports=router
