# API endpoints for LightRail AI
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Message(BaseModel):
    text: str
    sender: str
    
class MessageResponse(BaseModel):
    text: str
    thoughts: Optional[str] = None
    tool_calls: List[dict] = []

@router.post("/messages", response_model=MessageResponse)
async def send_message(message: Message, token: str = Depends(oauth2_scheme)):
    # Process message using agent loop
    return {
        'text': f'Response to: {message.text}',
        'thoughts': 'Processed user message',
        'tool_calls': []
    }

@router.get("/messages", response_model=List[Message])
async def get_messages(token: str = Depends(oauth2_scheme)):
    # Return message history
    return [
        {'text': 'Hello! I\'m LightRail AI. How can I help you today?', 'sender': 'agent'}
    ]

