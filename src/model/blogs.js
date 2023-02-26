const mongoose=require('mongoose')
const timestamps=require('mongoose-timestamp')
const blogSchema=mongoose.Schema({
    title: {
        en: {
            type: String,
            trim: true,
            required: true,
        },
        ar: {
            type: String,
            trim: true,
            required: true,
        }
    },

    description: {
        en: {
            type: String,
            trim: true,
            required: true,
        },
        ar: {
            type: String,
            trim: true,
            required: true,
        }
    },
    image: {
        type: String,
    }

})
blogSchema.plugin(timestamps)
const Blog=mongoose.model('blogs',blogSchema)
module.exports=Blog