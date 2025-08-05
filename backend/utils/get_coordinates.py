import requests
from typing import Dict


def get_coordinates(location: str) -> Dict[str, float | str]:
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
        return {"latitude": coords['latitude'], "longitude": coords['longitude']}

    return {"error": f"No coordinates found for {location}."}