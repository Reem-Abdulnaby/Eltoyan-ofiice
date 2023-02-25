const mongoose=require('mongoose')
const informationSchema=mongoose.Schema({
    title:{
        type:String,
        trim:true,
        
    },
    description:{
        type:String,
        trim:true,
        required:true

    }
})
const Info=mongoose.model('generalInfo',informationSchema)
module.exports=Info