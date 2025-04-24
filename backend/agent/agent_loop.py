from asyncio import Queue
from .event import Event

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
            
            if action_plan is None:
                result = {
                    'type': 'message',
                    'content': 'I cannot process this request right now. Please try again later.'
                }
                await self.modules['communicator'].send_message({
                    'type': 'agent',
                    'content': result['content']
                })
            else:
                # Select appropriate tool
                tool = self.tools.get_tool(action_plan.tool_name)
                
                # Execute the tool if it exists
                if tool:
                    result = await tool.execute(action_plan.parameters)
                else:
                    result = {
                        'type': 'error',
                        'content': f"Tool '{action_plan.tool_name if action_plan else 'None'}' not found"
                    }
                    await self.modules['communicator'].send_message({
                        'type': 'agent',
                        'content': f"I'm sorry, I don't have the capability to perform this action."
                    })
            
            # Process result
            await self.event_queue.put(Event(type="observation", data=result))
            
            # Check if task is complete
            if self.modules['planner'].is_task_complete():
                await self.modules['communicator'].send_completion(result)
                break
        self.is_running = False
