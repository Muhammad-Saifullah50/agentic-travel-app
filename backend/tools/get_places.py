
from agents import function_tool
import requests
from dotenv import load_dotenv
import os
from typing import List, Dict

load_dotenv()

geoapify_api_key: str | None = os.getenv("GEOAPIFY_API_KEY")
unsplash_access_key: str | None = os.getenv("UNSPLASH_ACCESS_KEY")

if not geoapify_api_key:
    raise ValueError("Geoapify API key is not set")
if not unsplash_access_key:
    raise ValueError("Unsplash access key is not set")


@function_tool
def get_places(city: str, interests: List[str]) -> List[Dict[str, object]]:
    print(f"get_places called with city={city}, interests={interests}")
    url = "https://api.geoapify.com/v2/places"

    # Build categories string for Geoapify
    categories = ",".join(interests) if interests else ""

    params = {
        "categories": categories,
        "filter": f"place:{city}",
        "limit": 10,
        "apiKey": geoapify_api_key
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        return [{"error": f"API request failed with status {response.status_code}"}]

    data = response.json()
    api_results = data.get("features", [])

    results: List[Dict[str, object]] = []
    for item in api_results:
        props: Dict[str, object] = item.get("properties", {})
        title = str(props.get("name")) if props.get("name") is not None else ""
        description = str(props.get("formatted")) if props.get("formatted") is not None else str(props.get("address_line2", ""))
        rating = None  # Geoapify does not provide ratings
        location = str(props.get("city")) if props.get("city") is not None else str(props.get("address_line1", ""))
        categories = props.get("categories")
        if isinstance(categories, list) and categories:
            category = categories[0] if isinstance(categories[0], str) else str(categories[0])
        else:
            category = None

        # Retrieve image from Unsplash based on title
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

        result: Dict[str, object] = {
            "id": props.get("place_id"),
            "title": title,
            "description": description,
            "rating": rating,
            "location": location,
            "category": category,
            "image_url": image_url,
        }
        if result["title"]:
            results.append(result)

    return results
