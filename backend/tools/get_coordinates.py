from agents import function_tool
import requests
from typing import Dict

@function_tool
def get_coordinates(location: str) -> str:
    """
    Get the coordinates (latitude and longitude) for a given location using Open-Meteo Geocoding API.
    
    Args:
        location (str): The name of the location to get coordinates for.
        
    Returns:
        dict: A dictionary containing 'latitude' and 'longitude'.
    """

    url = "https://geocoding-api.open-meteo.com/v1/search"

    params: Dict[str, str | int] = {
        "name": location,
        "count": 1,
        "language": "en",
        "format": "json"
    }

    response = requests.get(url, params=params)
    data = response.json()

    if data.get("results"):
        coords = data["results"][0]
        return f"The coordinates for {location} are: Latitude: {coords['latitude']}, Longitude: {coords['longitude']}"
    
    return f"No coordinates found for {location}."