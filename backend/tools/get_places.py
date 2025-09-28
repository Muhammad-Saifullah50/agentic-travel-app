from agents import function_tool
import requests
from dotenv import load_dotenv
import os
from typing import List
import logging
import json

# Configure logging once
logging.basicConfig(
    level=logging.DEBUG,  # or INFO in production
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

load_dotenv()

serpapi_key: str | None = os.getenv("SERPAPI_KEY")
if not serpapi_key:
    raise ValueError("SerpAPI key is not set")

@function_tool
def get_places(city: str) -> List[dict[str, str | int | None]]:
    """
    Fetches popular travel destinations for a given city using the SerpAPI Google search engine.
    Args:
        city (str): The name of the city for which to retrieve popular destinations.
    Returns:
        List[dict]: A list of dictionaries, each containing details about a popular destination,
        such as 'id', 'title', 'description', 'link', 'hotel_price', 'extracted_hotel_price', and 'thumbnail'.
        If the API request fails, returns a list with a single dictionary containing an 'error' key.
    """


    query = f"{city} Destinations"
    url = f"https://serpapi.com/search.json?engine=google&q={query}&api_key={serpapi_key}"
    response = requests.get(url)

    if response.status_code != 200:
        logger.error(f"API request failed with status {response.status_code}")
        return [{"error": f"API request failed with status {response.status_code}"}]

    data = response.json()
    results = []

    popular_destinations_list = data.get("top_sights", {}).get("sights", [])
    print(popular_destinations_list, 'popular_destinations_list')
    for idx, item in enumerate(popular_destinations_list):
        result = {
            "id": idx,
            "title": item.get("title"),
            "description": item["description"],
            "price": item["price"],
            "thumbnail": item["thumbnail"],
        }

        results.append(result)
    print(results, 'results')
    return results



#  this is returning fine 