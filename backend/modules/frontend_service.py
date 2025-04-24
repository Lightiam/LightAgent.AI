class FrontendService:
    def __init__(self, websocket=None):
        self.websocket = websocket
        self.response_queue = None
        
    async def send_message(self, message):
        """Send message to frontend"""
        if self.websocket:
            await self.websocket.send_json(message)
        return message
        
    async def wait_for_response(self):
        """Wait for response from frontend"""
        if self.websocket:
            response = await self.websocket.receive_json()
            return response
        return {"type": "error", "message": "No websocket connection"}
