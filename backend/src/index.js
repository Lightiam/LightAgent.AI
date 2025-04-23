const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users = [];
const conversations = [];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
  jwt.verify(token, process.env.JWT_SECRET || 'lightrail-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET || 'lightrail-secret-key', { expiresIn: '1h' });
  
  res.status(201).json({ token });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'lightrail-secret-key', { expiresIn: '1h' });
  
  res.json({ token });
});

app.post('/api/messages', authenticateToken, (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;
  
  let conversation = conversations.find(conv => conv.userId === userId);
  
  if (!conversation) {
    conversation = {
      id: conversations.length + 1,
      userId,
      messages: [
        { id: 1, text: "Hello! I'm LightRail AI. How can I help you today?", sender: 'agent' }
      ]
    };
    conversations.push(conversation);
  }
  
  const userMessage = { id: conversation.messages.length + 1, text: message, sender: 'user' };
  conversation.messages.push(userMessage);
  
  setTimeout(() => {
    const agentResponse = {
      id: conversation.messages.length + 1,
      text: generateAgentResponse(message),
      sender: 'agent'
    };
    conversation.messages.push(agentResponse);
  }, 1000);
  
  res.status(201).json({ message: userMessage });
});

app.get('/api/messages', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const conversation = conversations.find(conv => conv.userId === userId);
  
  if (!conversation) {
    return res.json({ messages: [
      { id: 1, text: "Hello! I'm LightRail AI. How can I help you today?", sender: 'agent' }
    ]});
  }
  
  res.json({ messages: conversation.messages });
});

function generateAgentResponse(message) {
  const responses = [
    "I'm processing your request. As a LightRail AI agent, I can help with information gathering, content creation, problem solving, and more. What specific task would you like assistance with?",
    "I'd be happy to help with that. Could you provide more details about what you're looking for?",
    "That's an interesting question. Let me think about how I can best assist you with this task.",
    "I can definitely help with that. Let me break this down into manageable steps.",
    "I'm analyzing your request. This is something I can help with using my capabilities."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
