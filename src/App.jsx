import { useState } from 'react'
import './App.css'
import RequestGPT from "./WebSocket.jsx";

function App() {
  const [socket, setSocket] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(socket){
      try{
        socket.send(JSON.stringify({ Request : true }));
        console.log("successfully request GPT API!");
      } catch(error){
        console.error("not request GPT API!");
      }
    } else{
      console.error( "WebSocket이 아직 연결되지 않았습니다.");
    }
    
  };

  return (
   <div>
    <RequestGPT onSocketReady = {setSocket}/>
    <form onSubmit={handleSubmit}>
    <button type='submit'>이야기 생성</button>
    </form>
    
   </div>
  )
}

export default App
