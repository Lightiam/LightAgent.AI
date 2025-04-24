import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import './styles.css';

const CommandCenter = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const { sendMessage, lastMessage, connectionStatus } = useWebSocket();
    
    useEffect(() => {
        if (lastMessage) {
            try {
                setMessages(prev => [...prev, JSON.parse(lastMessage)]);
            } catch (e) {
                console.error('Error parsing message:', e);
                setMessages(prev => [...prev, { type: 'error', content: lastMessage }]);
            }
        }
    }, [lastMessage]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(JSON.stringify({
            type: 'user_message',
            content: input
        }));
        
        // Add user message to the list
        setMessages(prev => [...prev, { type: 'user_message', content: input }]);
        setInput('');
    };
    
    return (
        <div className="command-center">
            <div className="message-history">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.type}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            
            <form onSubmit={handleSubmit} className="command-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a command..."
                    className="command-input"
                />
                <button type="submit" className="command-button">Send</button>
            </form>
            
            <div className="connection-status">
                Status: {connectionStatus}
            </div>
        </div>
    );
};

export default CommandCenter;
