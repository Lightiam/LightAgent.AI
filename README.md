# LightRail AI

LightRail AI is an intelligent AI assistant that provides advanced artificial intelligence capabilities to help you solve complex problems, generate content, and automate tasks with unprecedented ease and accuracy.

## Project Structure

### Frontend
- **components/**: UI elements and interaction components
- **services/**: API communication and state management
- **styles/**: CSS and design assets

### Backend
- **agent/**: Core agent loop implementation
- **modules/**: Specialized processing modules
- **tools/**: Tool integrations (shell, browser, file, etc)
- **api/**: REST endpoints for frontend communication

### Shared
- **schemas/**: Data models and validation
- **config/**: System configuration
- **logging/**: Monitoring and analytics

## Features

- Information Processing: Get answers to complex questions with fact-checking and information verification
- Content Creation: Generate articles, reports, documentation, and creative content
- Problem Solving: Break down complex problems into manageable steps with detailed solutions
- Code Generation: Create and edit code in various programming languages

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn api.main:app --reload
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

