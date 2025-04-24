import { useState, useEffect, useCallback } from 'react';

export const useWebSocket = (url = 'ws://localhost:8000/ws') => {
    const [socket, setSocket] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    
    useEffect(() => {
        const ws = new WebSocket(url);
        
        ws.onopen = () => {
            setConnectionStatus('connected');
        };
        
        ws.onmessage = (event) => {
            setLastMessage(event.data);
        };
        
        ws.onclose = () => {
            setConnectionStatus('disconnected');
        };
        
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setConnectionStatus('error');
        };
        
        setSocket(ws);
        
        return () => {
            ws.close();
        };
    }, [url]);
    
    const sendMessage = useCallback((message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
            return true;
        }
        return false;
    }, [socket]);
    
    return { sendMessage, lastMessage, connectionStatus };
};
