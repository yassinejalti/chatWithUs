import { createContext, useContext, useEffect, useState, useRef } from 'react';

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
    const initialStateRef = useRef(initialState);
    const dispatch = useDispatch();

    useEffect(() => {
        initialStateRef.current = initialState;
    }, [initialState]);

    useEffect(() => {        
        const websocket = new WebSocket('wss://robust-deluxe-pansy.glitch.me');
  
        websocket.onopen = () => {
            console.log('Connected to WebSocket server');
            websocket.send(JSON.stringify(initialState));
        };
  
        websocket.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            const latestInitialStateRef = initialStateRef.current;

            if(receivedMessage.client == null && receivedMessage.internal_client_ID != null){
                dispatch(open(receivedMessage));
                
            }
            else if(receivedMessage.client != null && receivedMessage.internal_client_ID != null && (receivedMessage.conversations == latestInitialStateRef.conversations)){
                dispatch(connect(receivedMessage));

            }
            else{
                dispatch(load_msg(receivedMessage));

            }

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

    return (
         <WebSocketContext.Provider value={{ ws }}>
            {children}
        </WebSocketContext.Provider>
    );
};
