const mongoose=require('mongoose')
const validator=require('validator')
const applaySchema=mongoose.Schema({
    fullName:{
        type:String,
        trim:true,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('هذا البريد الإلكتروني غير صالح الرجاء إدخال بريد إلكتروني آخر')
        }

    },
    phone:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value))
            throw new Error("الرجاءإدخال رقم هاتف صالح ")
        }
        
    },
    resume:{
        type:String,
        required:true,
    
    },
    message:{
        type:String,
        trim:true,
        minLength:3
    }

})
applaySchema.methods.toJSON=function(){
    const applay=this
    const applayObj=applay.toObject()
    return applayObj
}
const Applay=mongoose.model('applaies',applaySchema)
module.exports=Applay