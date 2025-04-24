import React, { useState, useEffect, useRef } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

const CommandCenter = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'system', content: "Welcome to LightRail AI. How can I assist you today?" }
  ]);
  const { sendMessage, lastMessage, connectionStatus } = useWebSocket();
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (lastMessage) {
      try {
        const parsedMessage = JSON.parse(lastMessage);
        setMessages(prev => [...prev, parsedMessage]);
      } catch (error) {
        console.error('Error parsing message:', error);
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          type: 'system', 
          content: lastMessage 
        }]);
      }
    }
  }, [lastMessage]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { 
      id: messages.length + 1, 
      type: 'user_message', 
      content: input 
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    sendMessage(JSON.stringify(userMessage));
    
    setInput('');
  };
  
  return (
    <div className="command-center">
      <div className="connection-status">
        Status: {connectionStatus}
      </div>
      
      <div className="message-history">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.type}`}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a command..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default CommandCenter;
