import json

class AnalyzerModule:
    def __init__(self, llm_service):
        self.llm = llm_service
        
    def process(self, event):
        """Process an event and extract relevant information"""
        try:
            if event.type == "message":
                try:
                    data = json.loads(event.data)
                    
                    if data.get('type') == 'user':
                        response = self.llm.generate(json.dumps(data))
                        return {
                            "type": "chat_response",
                            "content": response,
                            "original_message": data
                        }
                    
                    return data
                except json.JSONDecodeError:
                    return {
                        "type": "chat_response",
                        "content": self.llm.generate(event.data),
                        "original_message": event.data
                    }
            
            return {
                "type": event.type,
                "data": event.data
            }
        except Exception as e:
            print(f"Error in analyzer: {str(e)}")
            return {
                "type": "error",
                "message": f"Error processing event: {str(e)}",
                "original_event": {
                    "type": event.type,
                    "data": event.data
                }
            }
