from agents import function_tool
from typing import List, Dict, Any
from schemas.weather import DailyForecast
from schemas.places import Place


@function_tool
def make_itinerary(
    weather_data: List[DailyForecast],
    places_data: List[Place],
    days: int = 3
) -> List[Dict[str, Any]]:
    """
    Generates a structured itinerary using weather and places data.
    Args:
        weather_data: List of weather dicts from weather_forecast_agent.
        places_data: List of place dicts from places_agent.
        days: Number of days for the itinerary.
    Returns:
        List of day-wise itinerary dicts as per the agent instructions.
    """

    print('tool called ')
    itinerary = []
    # Distribute places across days
    places_per_day = max(1, len(places_data) // days)
    for i in range(days):
        day_weather = weather_data[i] if i < len(weather_data) else None
        day_places = places_data[i * places_per_day:(i + 1) * places_per_day]
        activities = []
        for place in day_places:
            activity = {
                "title": place.get("title"),
                "description": place.get("description"),
                "price": place.get("price"),
                "thumbnail": place.get("thumbnail"),
                "weather": {
                    "condition": day_weather.get("condition") if day_weather else None,
                    "max_temp_c": day_weather.get("max_temp_c") if day_weather else None,
                    "min_temp_c": day_weather.get("min_temp_c") if day_weather else None,
                } if day_weather else None,
            }
            activities.append(activity)
        itinerary.append({
            "day": day_weather.get("date") if day_weather else f"Day {i+1}",
            "activities": activities
        })
    return itinerary
