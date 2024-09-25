import React, { createContext, useContext, useEffect, useState } from 'react';

const defaultWebSocketContext = {
    ws: null,
    message: [],
    sendMessage: (message: any) => {},
};

// {name:'', age:'', gender:'', description:''}
const initialClient = {
    internal_client_ID:null,
    client: null,
    conversations: [],
};


const WebSocketContext = createContext<any>(defaultWebSocketContext);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }:any) => {
    const [ws, setWs] = useState<WebSocket>();
    const [message, setMessage] = useState<any[]>([]);
    // const [lastUpdate, setLastUpdate] = useState<any[]>([]);

    useEffect(() => {
        const websocket = new WebSocket('wss://robust-deluxe-pansy.glitch.me');
  
        websocket.onopen = () => {
            console.log('Connected to WebSocket server');
            websocket.send(JSON.stringify(initialClient));
        };
  
        websocket.onmessage = (event) => {
            const receivedMessage = (event.data);
            // setLastUpdate(JSON.parse(receivedMessage));
        };
  
        websocket.onclose = () => {
            console.log('WebSocket connection closed');
        };
  
        setWs(websocket);
  
        // Cleanup on component unmount
        return () => {
            websocket.close();
        };
    }, []);

    const sendMessage = (message:any) => {
        if (ws) {
            ws.send(JSON.stringify({ message }));
        }
    };

    return (
        <WebSocketContext.Provider value={{ ws, message, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};
