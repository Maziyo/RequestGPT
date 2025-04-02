import { use } from "react";
import { useState, useEffect } from "react";

const WEBSOCKTET_URL = "wss://319ebfjiaj.execute-api.ap-southeast-2.amazonaws.com/dev/"

function RequestGPT({ onSocketReady }) {
    const [ws, setWS] = useState(null);
    const [message, setMessages] = useState([]);

    useEffect(() => {
        const socket = new WebSocket(WEBSOCKTET_URL);
        setWS(socket);

        socket.onopen = async () => {
            console.log("WebSocket 연결 성공");
            if(onSocketReady){
                onSocketReady(socket);
            }
        };
    
        socket.onmessage = (event) => {
            console.log("메시지 수신:", event.data);
            setMessages((prev) => [...prev, event.data]);
        };
    
        socket.onerror = (error) => {
            console.error("WebSocket 에러:", error);
            setStatus("Error");
        };
    
        socket.onclose = () => {
            console.log("WebSocket 연결 종료");
            setStatus("Disconnected");
        };

        return ()=> {
            socket.close();
        };
    }, []);

    return null;
}

export default RequestGPT;