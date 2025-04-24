import json

class PlanningModule:
    def __init__(self, llm_service):
        self.llm = llm_service
        self.current_plan = None
        self.current_step = 0
        self.max_steps = 20
        self.chat_mode = False
        
    def create_plan(self, task_description):
        """Create a step-by-step plan for completing a task"""
        plan_prompt = f"""
        Create a detailed step-by-step plan to complete the following task:
        
        {task_description}
        
        Return the plan as numbered steps.
        """
        
        plan_text = self.llm.generate(plan_prompt)
        steps = self._parse_steps(plan_text)
        
        self.current_plan = {
            "task": task_description,
            "steps": steps,
            "current_step": 0
        }
        
        return self.current_plan
        
    def get_next_action(self, context):
        """Determine the next action to take based on the current plan"""
        # Check if this is a chat message
        if isinstance(context, dict) and context.get('type') == 'chat_response':
            self.chat_mode = True
            return type('ActionPlan', (), {
                'tool_name': 'communicator',
                'parameters': {
                    'message': context.get('content', 'No response content'),
                    'original_message': context.get('original_message', {})
                }
            })()
            
        if not self.current_plan and not self.chat_mode:
            self.create_plan("Assist the user with their requests")
            
        # If in chat mode or no plan, return None
        if self.chat_mode or not self.current_plan:
            return None
            
        current_step = self.current_plan["steps"][self.current_step]
        
        action_prompt = f"""
        Based on the current step: {current_step}
        
        And the current context: {context}
        
        Determine the appropriate tool to use and the parameters for that tool.
        
        Available tools: shell_exec, file_read, file_write, browser_navigate, etc.
        """
        
        action_text = self.llm.generate(action_prompt)
        action = self._parse_action(action_text)
        
        return action
        
    def is_task_complete(self):
        """Check if the current task is complete"""
        if self.chat_mode:
            return False
            
        if not self.current_plan:
            return False
            
        self.current_step += 1
        
        # Check if we've completed all steps or reached max steps
        if self.current_step >= len(self.current_plan["steps"]) or self.current_step >= self.max_steps:
            return True
            
        return False
        
    def _parse_steps(self, plan_text):
        """Parse steps from plan text"""
        # Simple implementation - in a real system this would be more robust
        lines = plan_text.strip().split("\n")
        steps = [line.strip() for line in lines if line.strip()]
        return steps
        
    def _parse_action(self, action_text):
        """Parse action from action text"""
        # Simple implementation - in a real system this would be more robust
        # This would parse the LLM output into a structured action
        # For now, return a dummy action
        return type('ActionPlan', (), {
            'tool_name': 'shell_exec',
            'parameters': {
                'id': 'default',
                'exec_dir': '/tmp',
                'command': 'echo "Hello, world!"'
            }
        })()
