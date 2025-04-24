import json

class FrontendService:
    def __init__(self, websocket=None):
        self.websocket = websocket
        self.response_queue = None
        
    async def send_message(self, message):
        """Send message to frontend"""
        if self.websocket:
            if isinstance(message, dict):
                try:
                    if message.get('type') == 'chat_response':
                        await self.websocket.send_text(json.dumps({
                            'id': message.get('original_message', {}).get('id', 0) + 1,
                            'type': 'agent',
                            'content': message.get('content', 'No response content')
                        }))
                    else:
                        await self.websocket.send_json(message)
                except Exception as e:
                    print(f"Error sending message: {str(e)}")
                    await self.websocket.send_text(json.dumps({
                        'type': 'error',
                        'content': f"Error: {str(e)}"
                    }))
            else:
                await self.websocket.send_text(str(message))
            
        return message
        
    async def wait_for_response(self):
        """Wait for response from frontend"""
        if self.websocket:
            try:
                response = await self.websocket.receive_json()
                return response
            except Exception as e:
                print(f"Error receiving response: {str(e)}")
                return {"type": "error", "message": f"Error receiving response: {str(e)}"}
        return {"type": "error", "message": "No websocket connection"}
        
    async def send_completion(self, result):
        """Send completion message to frontend"""
        if self.websocket:
            await self.send_message({
                'type': 'completion',
                'content': 'Task completed successfully',
                'result': result
            })
        return result
