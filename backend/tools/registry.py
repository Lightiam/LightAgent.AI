class ToolsRegistry:
    def __init__(self):
        self.tools = {}
        
    def register_tool(self, tool):
        self.tools[tool.name] = tool
        
    def get_tool(self, name):
        return self.tools.get(name)
        
    def list_tools(self):
        return [
            {
                "name": tool.name,
                "description": tool.description,
                "parameters_schema": tool.parameters_schema
            }
            for tool in self.tools.values()
        ]
