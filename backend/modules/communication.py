class CommunicationModule:
    def __init__(self, frontend_service):
        self.frontend = frontend_service
        
    def send_message(self, message):
        """Send message directly to frontend"""
        return self.frontend.send_message(message)
        
    def notify_user(self, message, attachments=None):
        """Send non-blocking notification to user"""
        return self.frontend.send_message({
            "type": "notify",
            "text": message,
            "attachments": attachments or []
        })
        
    def ask_user(self, question, attachments=None):
        """Send blocking question to user and wait for response"""
        response = self.frontend.send_message({
            "type": "ask",
            "text": question,
            "attachments": attachments or []
        })
        
        # Wait for user response
        return self.frontend.wait_for_response()
        
    def send_completion(self, result):
        """Send task completion notification"""
        return self.frontend.send_message({
            "type": "completion",
            "result": result
        })
