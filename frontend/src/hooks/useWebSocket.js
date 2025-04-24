import { useState, useEffect, useCallback } from 'react';

export const useWebSocket = (url = 'ws://localhost:8000/ws') => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    const webSocket = new WebSocket(url);
    
    webSocket.onopen = () => {
      setIsConnected(true);
      setConnectionStatus('Connected');
      console.log('WebSocket connection established');
    };
    
    webSocket.onclose = () => {
      setIsConnected(false);
      setConnectionStatus('Disconnected');
      console.log('WebSocket connection closed');
    };
    
    webSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Error');
    };
    
    webSocket.onmessage = (event) => {
      console.log('Message received:', event.data);
      setLastMessage(event.data);
    };
    
    setSocket(webSocket);
    
    return () => {
      webSocket.close();
    };
  }, [url]);
  
  const sendMessage = useCallback((message) => {
    if (socket && isConnected) {
      socket.send(message);
      console.log('Message sent:', message);
      return true;
    }
    console.error('Cannot send message, socket not connected');
    return false;
  }, [socket, isConnected]);
  
  return { sendMessage, lastMessage, isConnected, connectionStatus };
};
