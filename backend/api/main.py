from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import uvicorn
import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agent.agent_loop import AgentLoop
from agent.event import Event
from tools.registry import ToolsRegistry
from tools.shell_tool import ShellTool
from tools.file_tool import FileReadTool
from modules.communication import CommunicationModule
from modules.planning import PlanningModule
from modules.analyzer import AnalyzerModule
from modules.llm_service import LLMService
from modules.frontend_service import FrontendService

app = FastAPI(title="LightRail AI", description="Backend for LightRail AI agent")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize tools
tools_registry = ToolsRegistry()
tools_registry.register_tool(ShellTool())
tools_registry.register_tool(FileReadTool())

# Initialize LLM service
llm_service = LLMService()

@app.get("/")
async def root():
    return {"message": "Welcome to LightRail AI API"}

@app.get("/api/tools")
async def get_tools():
    return {"tools": tools_registry.list_tools()}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    # Initialize frontend service with websocket
    frontend_service = FrontendService(websocket)
    
    # Initialize modules
    modules = {
        "communicator": CommunicationModule(frontend_service),
        "planner": PlanningModule(llm_service),
        "analyzer": AnalyzerModule(llm_service)
    }
    
    # Initialize agent
    agent = AgentLoop(tools_registry, modules)
    
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            
            # Add to agent's event queue
            event = Event(type="message", data=data)
            await agent.event_queue.put(event)
            
            # Start agent processing if not already running
            if not agent.is_running:
                asyncio.create_task(agent.run())
                
    except WebSocketDisconnect:
        print("Client disconnected")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3000, reload=True)
