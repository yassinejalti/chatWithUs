import { createContext, useContext, useEffect, useState } from 'react';

// store properties
import { useSelector, useDispatch } from 'react-redux';
import { fresh, fresh_msg, open, close } from '../store/reducer';

const defaultWebSocketContext = {
    ws: null,
};

const WebSocketContext = createContext<any>(defaultWebSocketContext);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }: any) => {
    const [ws, setWs] = useState<WebSocket>();
    const initialState = useSelector((state: any) => state.general).general;    
    const dispatch = useDispatch();
    const delay = 1000;

    const connectWebSocket = () => {
        const websocket = new WebSocket('wss://robust-deluxe-pansy.glitch.me');

        websocket.onopen = () => {
            console.log('Connected to WebSocket server');
            if (websocket.readyState === WebSocket.OPEN) {
                websocket.send(JSON.stringify(initialState));
            }
        };

        websocket.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            
            if (receivedMessage.client == null && receivedMessage.internal_client_ID != null) {
                dispatch(open(receivedMessage));
            } 
            else if (receivedMessage.client !== null && receivedMessage.internal_client_ID !== null && receivedMessage.refresh_msg) {
                const { refresh_msg, ...CorrectStructer } = receivedMessage;
                dispatch(fresh_msg(CorrectStructer));
            } 
            else if (receivedMessage.client !== null && receivedMessage.internal_client_ID !== null && receivedMessage.refresh) {
                const { refresh, ...CorrectStructer } = receivedMessage;
                dispatch(fresh(CorrectStructer));
            }
        };

        websocket.onclose = () => {
            console.log('WebSocket connection closed');
            dispatch(close());
            setTimeout(connectWebSocket, delay);
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setWs(websocket);
    };

    useEffect(() => {
        connectWebSocket();

        // Cleanup on component unmount
        return () => {
            if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
                ws.close();
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ ws }}>
            {children}
        </WebSocketContext.Provider>
    );
};
