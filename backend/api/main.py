# LightRail AI Backend
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from api import messages
import uvicorn

app = FastAPI(title="LightRail AI", description="Backend for LightRail AI agent")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(messages.router, prefix="/api", tags=["messages"])

@app.get("/")
async def root():
    return {"message": "Welcome to LightRail AI API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3000, reload=True)

