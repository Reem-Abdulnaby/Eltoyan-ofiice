const express=require('express')
const app=express()
const path=require('path')
const PORT=process.PORT || 3000
require('./connection/db')
app.use(express.json())

app.use('/images',express.static(path.join(__dirname, "./src/uploads")))
app.use('/files',express.static(path.join(__dirname, "./src/resume")))
const serviceRouter=require('./router/servoce-router')
const clientRouter=require('./router/client-router')
const requestRouter=require('./router/request-router')
const applayRouter=require('./router/applay-router')
app.use(serviceRouter)
app.use(clientRouter)
app.use(requestRouter)
app.use(applayRouter)
app.listen(PORT,()=>{console.log('server is run on port 3000')})