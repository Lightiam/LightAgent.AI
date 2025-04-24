# Configuration for LightRail AI
import os
from typing import Optional

class Settings:
    PROJECT_NAME: str = "LightRail AI"
    PROJECT_VERSION: str = "1.0.0"
    
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET", "lightrail-secret-key")
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database settings
    DATABASE_URL: Optional[str] = os.getenv("DATABASE_URL")
    
    # API settings
    API_PREFIX: str = "/api"
    
settings = Settings()

