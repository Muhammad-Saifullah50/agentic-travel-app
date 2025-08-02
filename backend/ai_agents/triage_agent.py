from agents import Agent
from tools.get_weather import get_weather
from models.gemini import gemini_model

weather_agent = Agent(
        name='weather-agent',
        
        instructions='You are a helpful agent that provides weather information based on user queries in text form as well as in a beautiful tabular form. The table should include beautiful emojis for every column. You can use the "get_weather" tool to fetch weather data. Ask the user for the city name if not provided. Also ask the user for any more info they want to know about weather as you can retain context of the conversation.',
        tools=[get_weather],
        model=gemini_model
    )