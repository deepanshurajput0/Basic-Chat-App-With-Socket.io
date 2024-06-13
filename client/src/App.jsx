import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import './App.css'

function App() {
  const socket = useMemo(()=>io('http://localhost:8000'),[])
  const [message, setMessage]=useState('')
  const [room, setRoom]=useState('')
  const [socketId,setSocketId]=useState('')
  const [messages,setMessages]=useState([])
  console.log(messages)
  const handleSubmit=(e)=>{
   e.preventDefault()
   socket.emit('message',{message,room})

  }
  useEffect(()=>{
    socket.on('connect',()=>{
      setSocketId(socket.id)
      console.log('connected', socket.id)
      setMessage('')
    })
    socket.on('received-message',(data)=>{
    console.log(data)
    setMessages((messages)=>[...messages,data])
    })
   socket.on('welcome',(s)=>{
   console.log(s)
   })
   return ()=>{
    socket.disconnect()
   }
  },[])
  return (
    <>
      <div className='chat-app'>
        <h1> Sandesak </h1>
         <p>Room Id   {
          socketId
        }</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter Your Message' value={message} onChange={(e)=>setMessage(e.target.value)} /> <br />
          <input type="text" placeholder='Enter Your Room Id' value={room} onChange={(e)=>setRoom(e.target.value)} /> <br />
          <button type="submit" >Send</button>
        </form>
        <div className='messages'>
          <h1>Our Chats</h1>
          {
            messages.map((m,i)=>(
              <div className='m' key={i}>{m}</div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
