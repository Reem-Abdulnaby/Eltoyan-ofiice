const express=require('express')
const router=express.Router()
const Admin=require('../model/admin')
const auth=require('../middelware/auth')
const Service=require('../model/services')
const Client=require('../model/clients')
const Request=require('../model/requests')
const Applay=require('../model/applay')
const Contact=require('../model/contact')
const multer=require('multer')
const path=require('path')
const Uploads=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/))
            return cb(new Error('please upload image !'))
        cb(null,true)
    },
    storage:multer.diskStorage({
        destination:(req, file, cb)=>{
            const fullPath = path.join(__dirname, '../uploads')
            cb(null,fullPath )
        },
        filename:(req,file, cb)=>{
            console.log(req.body);
            const fileName = Date.now().toString()+ "_" + file.originalname 
            cb(null, fileName)
        }
    }),
})


router.post('/signup',async(req,res)=>{
  try{
    const admin=new Admin(req.body)
    const token= await admin.generateToken()
    await admin.save()
    res.status(200).send(admin)
  }
  catch(e){
    res.status(500).send(e.message)
  }
})
router.post('/login',async(req,res)=>{
    try{
        const admin= await Admin.Login(req.body.email,req.body.password)
        const token=await admin.generateToken()
        await admin.save()
        res.status(200).send(admin)
    }
    catch(e){
        res.status(500).send(e.message)
        console.log(e.message)

    }
})
router.get('/profile',auth,async(req,res)=>{
  try{
    res.status(200).send(req.admin)
  }
  catch(e){
    res.status(500).send(e.message)
  }
})
router.patch('/admin/update',auth,async(req,res)=>{
  try{
     const Update=Object.keys(req.body)
      Update.forEach(el=>{req.admin[el]=req.body[el]})

     await  req.admin.save()
     res.status(200).send(req.admin)

  }
  catch(e){
      res.status(500).send(e.message)
  }
})
router.delete('/admin/logout',auth,async(req,res)=>{
  try{
     req.admin.tokens=req.admin.tokens.filter(el=>{
      return el!=req.token
     })
    await req.admin.save()
      return res.status(200).send('succefully deleted')
   
     
  }
  catch(e){
      res.status(500).send(e.message)
  }
})
router.delete('/admin/logoutall',auth,async(req,res)=>{
  try{
     req.admin.token=[]
    await  req.admin.save()
    res.status(200).send('succefully deleted')
  }
  catch(e){
      res.status(500).send(e.message)
  }
})
 router.post('/admin/service/insert',auth,Uploads.single('avatar'),async(req,res)=>{
try{
  const service=new Service(req.body)
  if(req.file){
    service.image=req.file.filename
  }
  await service.save()
  res.status(200).send(service)
}
catch(e){
  res.status(400).send(e.message)
}
 })
 router.patch('/admin/service/update/:id',auth,Uploads.single('avatar'),async(req,res)=>{
  try{
    const serviceId=req.params.id
    const service= await Service.findByIdAndUpdate({_id:serviceId},req.body,
      {new:true,
          runValidators:true})
      if(!service)
      return res.status(200).send('لا توجد نتائج مطابقة')
         if(req.file){
         service.image=req.file.filename }
      await service.save()
    return  res.status(200).send(service)
  }
  catch(e){
    res.status(400).send(e.message)
  }
 })
 router.get('/admin/service/getbyid/:id',auth,async(req,res)=>{
  try{
      const serviceId=req.params.id
      const service = await Service.findById({_id:serviceId})
      if(!service){
      return res.status(404).send('لا توجد نتائج مطابقه ')}
       return res.status(200).send(service)

  }
  catch(e){
      res.status(400).send(e.message)
  }
})
router.get('/admin/service/getall',auth,async(req,res)=>{
  try{
      const service= await Service.find()
      res.status(200).send(service)
  }
  catch(e){
      res.status(400).send(e.massage)
  }
})
router.delete('/admin/service/deletebyid/:id',auth,async(req,res)=>{
try{
  const serviceId=req.params.id
  const service= await Service.findByIdAndDelete({_id:serviceId})
  if(!service){
      return res.status(404).send('لا توجد نتائج متطابقه')

  }
  return res.status(200).send("تمت العملية بنجاح")
}
catch(e){
  res.status(400).send(e.massage)
}
})
router.delete('/admin/service/deleteall',auth,async(req,res)=>{
  try{
     await  Service.deleteMany({})
      res.status(200).send('done')
  }
  catch(e){
      res.status(400).send(e.message)
  }
})
router.get('/admin/request/getall',auth,async(req,res)=>{
  try{
      const request= await Request.find()
      res.status(200).send(request)
  }
  catch(e){
      res.status(400).send(e.message)
  }
})
router.get('/admin/request/getbyid/:id',auth,async(req,res)=>{
try{
  const requestId=req.params.id
  const request= await Request.findById({_id:requestId})
  if(!request){
      return res.status(404).send('لا توجد نتائج مطابقة')
  }
  return res.status(200).send(request)
}
catch(e){
  res.status(400).send(e.message)
}
})
router.patch('/admin/request/update/:id',auth,async(req,res)=>{
  try{
      const requestId=req.params.id
      const request = await Request.findByIdAndUpdate({_id:requestId},req.body,{
          new:true,
          runValidators:true
      })
       if(!request){
          return res.status(404).send('لا توجد نتائج مطابقة')
       }
       await request.save()
       return res.status(200).send(request)
  }
  catch(e){
      res.status(400).send(e.message)
  }
})
router.delete('/admin/request/deletebyid/:id',auth,async(req,res)=>{
  try{
      const requestId=req.params.id
      const request= await Request.findByIdAndDelete({_id:requestId})
      if(!request){
          return res.status(404).send('لاتوجد نتائج مطابقه')
      }
      return res.status(200).send('تمت الإزاله')
  }
  catch(e){
      res.status(400).send(e.message)
  }
})
router.delete('/admin/request/deleteall',auth,async(req,res)=>{
  try{
     await  Request.deleteMany({})
      res.status(200).send('done')
  }
  catch(e){
      res.status(400).send(e.message)
  }
})
router.post('/admin/client/add',auth,Uploads.single('avatar'),async(req,res)=>{
  try{
    const client= new Client(req.body)
    client.image=req.file.filename
     await client.save()
    res.status(200).send(client)
  }
  catch(e){
     res.status(400).send(e.message)
  }
 })
 router.get('/admin/client/getall',auth,Uploads.single('avatar'),async(req,res)=>{
     try{
         const client= await Client.find()
         res.status(200).send(client)
     }
     catch(e){
         res.status(400).send(e.message)
     }
 })
 router.patch('/admin/client/update/:id',auth,Uploads.single('avatar'),async(req,res)=>{
     try{
         const clientId=req.params.id
         const client= await Client.findById({_id:clientId})
         client.image=req.file.filename
         await client.save()
         res.status(200).send(client)
     }
     catch(e){
         res.status(400).send(e.message)
     }
 })
 router.delete('/admin/client/delete/:id',auth,async(req,res)=>{
     try{
         const clientId=req.params.id
         const client =await Client.findByIdAndDelete({_id:clientId})
         res.status(200).send('تمت العملية بنجاح')
     }
     catch(e){
         res.status(400).send(e.message)
     }
 })
 router.delete('/admin/client/deleteall',auth,async(req,res)=>{
     try{
        await  Client.deleteMany({})
         res.status(200).send('done')
     }
     catch(e){
         res.status(400).send(e.message)
     }
 })
 router.get('/admin/applay/all',auth,async(req,res)=>{
  try{
      const applaies= await Applay.find()
      res.status(200).send(applaies)
  }
  catch(e){
      res.status(400).send(e.message)
  }
})
router.get('/admin/applay/getbyid/:id',auth,async(req,res)=>{
  try{
      const applayId=req.params.id
      const applay= await Applay.findById({_id:applayId})
      if(!applay){
          return res.status(404).send('لا توجد نتائج مطابقة')
      }
      return res.status(200).send(applay)
  }
  catch(e){
      res.status(400).send(e.message)
  }
})

router.delete('/admin/applay/deletebyId/:id',auth,async(req,res)=>{
  try{
      const applayId=req.params.id
      const applay=await Applay.findByIdAndDelete({_id:applayId})
      if(!applay){
      return res.status(404).send('لا توجد نتائج مطابقه')}
      res.status(200).send('done')
  }
  catch(e){
      res.status(400).send(e.message)
  }
})
router.delete('/admin/applay/deleteall',auth,async(req,res)=>{
  try{
     await  Applay.deleteMany({})
      res.status(200).send('done')
  }
  catch(e){
      res.status(400).send(e.message)
  }
})
//contact us 
router.post('/admin/contact/add',auth,async(req,res)=>{
 try{
  const contact= new Contact(req.body)
  await contact.save()
  res.status(200).send(contact)
 }
 catch(e){
  res.status(400).send(e.message)
 }
})
router.patch('/admin/contact/update/:id',auth,async(req,res)=>{
  try{
    const contactId=req.params.id
    const contact= await Contact.findByIdAndUpdate({_id:contactId},req.body,{
      new:true,
      runValidators:true
    })
    if(!contact){
      return res.status(404).send('not found')
    }
  await contact.save()
  res.status(200).send(contact)
 }
 catch(e){
  res.status(400).send(e.message)
 }
})

module.exports=router