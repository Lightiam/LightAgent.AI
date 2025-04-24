import aiofiles
from .base_tool import BaseTool

class FileReadTool(BaseTool):
    def __init__(self):
        super().__init__(
            name="file_read",
            description="Read file content",
            parameters_schema={
                "type": "object",
                "properties": {
                    "file": {"type": "string"},
                    "start_line": {"type": "integer"},
                    "end_line": {"type": "integer"},
                    "sudo": {"type": "boolean"}
                },
                "required": ["file"]
            }
        )
        
    async def _execute(self, parameters):
        path = parameters["file"]
        
        try:
            async with aiofiles.open(path, 'r') as file:
                content = await file.read()
                
            if "start_line" in parameters:
                lines = content.splitlines()
                start = parameters.get("start_line", 0)
                end = parameters.get("end_line", len(lines))
                content = "\n".join(lines[start:end])
                
            return {
                "content": content,
                "success": True
            }
        except Exception as e:
            return {
                "error": str(e),
                "success": False
            }
