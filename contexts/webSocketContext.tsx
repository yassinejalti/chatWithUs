import { createContext, useContext, useEffect, useState } from 'react';

// store properties
import { useSelector, useDispatch } from 'react-redux';
import { connect, load_msg, open } from '../store/reducer';


const defaultWebSocketContext = {
    ws: null,
};

const WebSocketContext = createContext<any>(defaultWebSocketContext);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }:any) => {
    const [ws, setWs] = useState<WebSocket>();
    const initialState = useSelector((state:any) => state.general).general;    
    const dispatch = useDispatch();
    
    useEffect(() => {
        const websocket = new WebSocket('wss://robust-deluxe-pansy.glitch.me');

        websocket.onopen = () => {
            console.log('Connected to WebSocket server');
            if (websocket.readyState === WebSocket.OPEN) {
                websocket.send(JSON.stringify(initialState));
            }
        };
  
        websocket.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            
            if(receivedMessage.client == null && receivedMessage.internal_client_ID != null){
                dispatch(open(receivedMessage));
                
            }
            else if(receivedMessage.client !== null && receivedMessage.internal_client_ID !== null && receivedMessage.connected){
                const { connected, ...CorrectStructer } = receivedMessage;
                dispatch(connect(CorrectStructer));
        
            } 
            else if(receivedMessage.client !== null && receivedMessage.internal_client_ID !== null && receivedMessage.loaded_info){
                const { loaded_info, ...CorrectStructer } = receivedMessage;
                dispatch(load_msg(CorrectStructer));

            }

        };
  
        websocket.onclose = () => {
            console.log('WebSocket connection closed');
        };
  
        setWs(websocket);
  
        // Cleanup on component unmount
        return () => {
            if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
                websocket.close();
            }
        };
    }, []);

    return (
         <WebSocketContext.Provider value={{ ws }}>
            {children}
        </WebSocketContext.Provider>
    );
};
