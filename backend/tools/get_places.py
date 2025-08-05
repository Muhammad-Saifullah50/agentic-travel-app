from agents import function_tool
import requests
from dotenv import load_dotenv
import os

load_dotenv()

travel_api_key:str | None = os.getenv("TRAVEL_API_KEY")

if not travel_api_key:
    raise ValueError("Travel API key is not set")
   
@function_tool
def get_places(city: str) -> str:
    print('places tool called')
    url = "https://travel-advisor.p.rapidapi.com/locations/auto-complete"

    querystring = {"query":f"{city}","lang":"en_US","units":"km"}

    headers: dict[str, str | None] = {
	"x-rapidapi-key": travel_api_key,
	"x-rapidapi-host": "travel-advisor.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    
    return response.text

