class Event:
    def __init__(self, type, data):
        """Initialize an event with a type and data payload
        
        Args:
            type (str): The event type (e.g., 'message', 'observation', 'error')
            data (any): The event data payload
        """
        self.type = type
        self.data = data
        
    def __str__(self):
        """String representation of the event"""
        return f"Event(type={self.type}, data={str(self.data)[:50]}...)"
        
    def to_dict(self):
        """Convert event to dictionary"""
        return {
            "type": self.type,
            "data": self.data
        }
