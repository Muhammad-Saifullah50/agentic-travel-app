from agents import function_tool
import requests
from dotenv import load_dotenv
import os
from pydantic import HttpUrl
from typing import List

load_dotenv()

travel_api_key: str | None = os.getenv("TRAVEL_API_KEY")

if not travel_api_key:
    raise ValueError("Travel API key is not set")

@function_tool
def get_places(city: str, interests: list[str]) -> List[dict]:
    url = "https://travel-advisor.p.rapidapi.com/locations/auto-complete"

    querystring: dict[str, str | list[str]] = {
        "query": city,
        "lang": "en_US",
        "units": "km",
        "interests": interests
    }

    headers: dict[str, str | None] = {
        "x-rapidapi-key": travel_api_key,
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    if response.status_code != 200:
        return [{"error": f"API request failed with status {response.status_code}"}]

    data = response.json()

    # Extract only relevant fields
    results = []
    for idx, item in enumerate(data.get("data", [])):
        try:
            result = {
                "id": idx,
                "title": item.get("result_object", {}).get("name"),
                "description": item.get("result_object", {}).get("description", ""),
                "rating": float(item.get("result_object", {}).get("rating", 0.0)),
                "location": item.get("result_object", {}).get("location_string", ""),
                "category": item.get("result_type", ""),
                "image_url": item.get("result_object", {}).get("photo", {}).get("images", {}).get("small", {}).get("url")
            }
            # Only add result if title and image are present
            if result["title"] and result["image_url"]:
                results.append(result)
        except Exception as e:
            continue  # Skip malformed items
    print(results)
    return results
