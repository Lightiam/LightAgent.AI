from asyncio import Queue

class AgentLoop:
    def __init__(self, tools_registry, modules):
        self.tools = tools_registry
        self.modules = modules
        self.event_queue = Queue()
        self.is_running = False
        
    async def run(self):
        self.is_running = True
        while True:
            event = await self.event_queue.get()
            
            # Process events from user or system
            analyzed_event = self.modules['analyzer'].process(event)
            
            # Get next action from planner
            action_plan = self.modules['planner'].get_next_action(analyzed_event)
            
            # Select appropriate tool
            tool = self.tools.get_tool(action_plan.tool_name)
            
            # Execute the tool
            result = await tool.execute(action_plan.parameters)
            
            # Process result
            self.event_queue.put(Event(type="observation", data=result))
            
            # Check if task is complete
            if self.modules['planner'].is_task_complete():
                self.modules['communicator'].send_completion(result)
                break
        self.is_running = False
