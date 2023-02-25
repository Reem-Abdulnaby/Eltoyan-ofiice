// const mongoose=require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/Eltoyan-ofiice')
const mongoose=require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://hamedsama:avGXlkXMeMwhvhW3@main.xjbe1d6.mongodb.net/?retryWrites=true&w=majority',{
    autoIndex: true,
})
