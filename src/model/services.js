const mongoose=require('mongoose')
const serviceSchema=mongoose.Schema({

    title:{
        type:String,
        trim:true,
        required:true,
    },
    subTitle:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    image:{
        type:String,
        
    },
    
})
serviceSchema.methods.toJSON=function(){
    const service=this
    const seviceObj=service.toObject()
    return seviceObj
}
 const Service=mongoose.model('services',serviceSchema)
module.exports=Service