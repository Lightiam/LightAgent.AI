import os
import json
import groq
from dotenv import load_dotenv

load_dotenv()

class LLMService:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GROQ_API_KEY", "")
        self.fallback_mode = False
        
        try:
            if not self.api_key or self.api_key == "your-groq-api-key-here":
                print("Warning: No valid Groq API key provided. Using fallback response mode.")
                self.fallback_mode = True
            else:
                self.client = groq.Client(api_key=self.api_key)
                self.client.chat.completions.create(
                    model="llama3-8b-8192",
                    messages=[{"role": "user", "content": "test"}],
                    max_tokens=1
                )
        except Exception as e:
            print(f"Error initializing Groq client: {str(e)}")
            print("Falling back to local response mode.")
            self.fallback_mode = True
        
        self.model = "llama3-70b-8192"
        
        self.system_prompt = """You are LightRail AI, an advanced agent platform that executes complex workflows by
        integrating with tools, processing information, and automating tasks through a powerful event-driven architecture.
        Be helpful, concise, and informative in your responses."""
        
    def generate(self, prompt):
        """Generate text using LLM"""
        try:
            try:
                if isinstance(prompt, str) and prompt.strip().startswith('{'):
                    data = json.loads(prompt)
                    user_message = data.get('content', prompt)
                else:
                    user_message = prompt
            except:
                user_message = prompt
            
            if self.fallback_mode:
                if isinstance(user_message, str):
                    if "help" in user_message.lower():
                        return "I'm LightRail AI, your AI assistant. I can help you with various tasks, answer questions, and provide information on different topics. What would you like to know?"
                    elif "what can you do" in user_message.lower():
                        return "As LightRail AI, I can assist with task automation, tool integration, and workflow management. I'm designed to help you streamline your processes and increase productivity."
                    elif "hello" in user_message.lower() or "hi" in user_message.lower():
                        return "Hello! I'm LightRail AI, your AI assistant. How can I help you today?"
                    else:
                        return f"I understand you're asking about '{user_message[:50]}...'. As LightRail AI, I'd provide a detailed response if I had a valid API connection. Is there something specific you'd like to know?"
                else:
                    return "I'm LightRail AI, your AI assistant. How can I help you today?"
            
            chat_completion = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.7,
                max_tokens=1024,
            )
            
            return chat_completion.choices[0].message.content
            
        except Exception as e:
            print(f"Error generating response: {str(e)}")
            self.fallback_mode = True
            return f"I'm LightRail AI. I'd normally provide a detailed response, but I'm currently operating in fallback mode. How can I assist you with basic information?"
