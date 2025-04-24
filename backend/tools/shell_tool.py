import asyncio
from .base_tool import BaseTool

class ShellTool(BaseTool):
    def __init__(self):
        super().__init__(
            name="shell_exec",
            description="Execute commands in shell",
            parameters_schema={
                "type": "object",
                "properties": {
                    "id": {"type": "string"},
                    "exec_dir": {"type": "string"},
                    "command": {"type": "string"}
                },
                "required": ["id", "exec_dir", "command"]
            }
        )
        
    async def _execute(self, parameters):
        proc = await asyncio.create_subprocess_shell(
            parameters["command"],
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=parameters["exec_dir"]
        )
        
        stdout, stderr = await proc.communicate()
        
        return {
            "id": parameters["id"],
            "stdout": stdout.decode(),
            "stderr": stderr.decode(),
            "returncode": proc.returncode
        }
