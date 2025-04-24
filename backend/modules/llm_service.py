import os
import json
import groq
from dotenv import load_dotenv

load_dotenv()

class LLMService:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GROQ_API_KEY", "")
        if not self.api_key:
            print("Warning: No Groq API key provided. Using fallback response mode.")
        else:
            self.client = groq.Client(api_key=self.api_key)
        
        self.model = "llama3-70b-8192"
        
        self.system_prompt = """You are LightRail AI, an advanced agent platform that executes complex workflows by
        integrating with tools, processing information, and automating tasks through a powerful event-driven architecture.
        Be helpful, concise, and informative in your responses."""
        
    def generate(self, prompt):
        """Generate text using LLM"""
        try:
            if not self.api_key:
                return f"I'm LightRail AI. I'd respond to '{prompt[:50]}...' if I had a valid API key."
            
            try:
                data = json.loads(prompt)
                user_message = data.get('content', prompt)
            except:
                user_message = prompt
                
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
            return f"I encountered an error while processing your request. Please try again later."
