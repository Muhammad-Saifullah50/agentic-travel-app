from agents import function_tool
import requests
from dotenv import load_dotenv
import os
from typing import List

load_dotenv()

travel_api_key: str | None = os.getenv("TRAVEL_API_KEY")
unsplash_access_key: str | None = os.getenv("UNSPLASH_ACCESS_KEY")

if not travel_api_key:
    raise ValueError("Travel API key is not set")
if not unsplash_access_key:
    raise ValueError("Unsplash access key is not set")


@function_tool
def get_places(city: str, interests: List[str]) -> List[dict]:
    print(f"get_places called with city={city}, interests={interests}")
    url = "https://travel-advisor.p.rapidapi.com/locations/auto-complete"

    querystring = {
        "query": city,
        "lang": "en_US",
        "units": "km"
    }

    headers = {
        "x-rapidapi-key": travel_api_key,
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    if response.status_code != 200:
        return [{"error": f"API request failed with status {response.status_code}"}]

    data = response.json()
    api_results = data.get("data", [])

    results = []
    for item in api_results:
        result_obj = item.get("result_object", {})
        title = result_obj.get("name")

        # Retrieve image from Unsplash
        image_url = None
        if title:
            unsplash_url = f"https://api.unsplash.com/search/photos?query={title}&client_id={unsplash_access_key}"
            try:
                unsplash_resp = requests.get(unsplash_url)
                if unsplash_resp.status_code == 200:
                    unsplash_data = unsplash_resp.json()
                    if unsplash_data.get("results"):
                        image_url = unsplash_data["results"][0]["urls"]["regular"]
            except Exception:
                image_url = None

        result = {
            "id": result_obj.get("location_id"),
            "title": title,
            "description": result_obj.get("geo_description", ""),
            "rating": result_obj.get("rating"),
            "location": result_obj.get("address_obj", {}).get("city"),
            "category": result_obj.get("category", {}).get("key"),
            "image_url": image_url,
        }
        if result["title"] and result["image_url"]:
            results.append(result)

    return results
