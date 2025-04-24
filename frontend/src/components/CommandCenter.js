import React, { useState, useEffect, useRef } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

const CommandCenter = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'system', content: "Welcome to LightRail AI. How can I assist you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { sendMessage, lastMessage, connectionStatus } = useWebSocket();
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (lastMessage) {
      try {
        const parsedMessage = JSON.parse(lastMessage);
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          type: 'agent',
          content: parsedMessage.content || parsedMessage.data || parsedMessage
        }]);
        setIsTyping(false);
      } catch (error) {
        console.error('Error parsing message:', error);
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          type: 'agent', 
          content: typeof lastMessage === 'string' ? lastMessage : 'Received a response I couldn\'t process.'
        }]);
        setIsTyping(false);
      }
    }
  }, [lastMessage]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { 
      id: messages.length + 1, 
      type: 'user', 
      content: input 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    sendMessage(JSON.stringify(userMessage));
    
    setInput('');
  };
  
  return (
    <div className="command-center">
      <div className="chat-header">
        <div className="chat-title">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#6b46c1" />
            <path d="M2 17L12 22L22 17" stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>LightRail AI Assistant</span>
        </div>
        <div className="connection-status">
          {connectionStatus === 'Connected' ? 
            <span className="status-connected">●</span> : 
            <span className="status-disconnected">●</span>
          }
          {connectionStatus}
        </div>
      </div>
      
      <div className="message-history">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.type}`}>
            <div className="message-avatar">
              {msg.type === 'user' ? 
                <div className="user-avatar">U</div> : 
                <div className="agent-avatar">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              }
            </div>
            <div className="message-content">
              <div className="message-text">{msg.content}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message agent">
            <div className="message-avatar">
              <div className="agent-avatar">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask LightRail AI anything..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default CommandCenter;
