import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMessages, sendMessage } from '../services/api';

function Dashboard({ logout }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm LightRail AI. How can I help you today?", sender: 'agent' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages();
        if (response.messages && response.messages.length > 0) {
          setMessages(response.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      await sendMessage(input);
      
      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          text: "I'm processing your request. As a LightRail AI agent, I can help with information gathering, content creation, problem solving, and more. What specific task would you like assistance with?",
          sender: 'agent'
        };
        setMessages(prevMessages => [...prevMessages, agentResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="logo">LightRail.dev</div>
        <div className="nav-links">
          <button onClick={logout} className="button secondary-button">Logout</button>
        </div>
      </nav>

      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'user' ? 'user-message' : 'agent-message'}`}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div className="message agent-message">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="message-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
