# Logging utilities for LightRail AI
import logging
import sys
from typing import Dict, Any

class Logger:
    @staticmethod
    def setup():
        logging.basicConfig(
            level=logging.INFO,
            format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            handlers=[logging.StreamHandler(sys.stdout)]
        )
        
    @staticmethod
    def get_logger(name: str):
        return logging.getLogger(name)
    
    @staticmethod
    def log_request(request_data: Dict[str, Any]):
        logger = Logger.get_logger("request")
        logger.info(f"Request: {request_data}")
        
    @staticmethod
    def log_response(response_data: Dict[str, Any]):
        logger = Logger.get_logger("response")
        logger.info(f"Response: {response_data}")

# Initialize logger
Logger.setup()

