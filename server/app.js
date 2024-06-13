import express from 'express'
import { Server} from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'
const port = 8000
const app = express()

const server = createServer(app)

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:["GET","POST"],
        credentials:true
    }
})
app.use(cors())

app.get('/',(req,res)=>{
  res.json('hello world')
})

io.on('connection',(socket)=>{
  console.log('User connected', socket.id)
  socket.on('message',({room,message})=>{
  console.log(room,message)
  io.to(room).emit('received-message',message)
  })
  socket.on('disconnect',()=>{
    console.log('User disconnected', socket.id)
  })
})
server.listen(port,()=>{
 console.log(`Server is running on Port ${port}`)  
})