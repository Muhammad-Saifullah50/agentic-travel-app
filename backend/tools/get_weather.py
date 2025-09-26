from agents import function_tool
import requests
from utils.extract_forecast_data import extract_forecast_data
import os
from dotenv import load_dotenv


load_dotenv()

@function_tool
def get_weather(location: str) :

    try:
        api_key = os.getenv("WEATHER_API_KEY")

        if not api_key:
            return [
                {
                    "error": "Weather API key is missing. Please set WEATHER_API_KEY in your .env file."
                }
            ]

        if not location:
            return [{"error": "Location is required to fetch weather data."}]

        url = "https://api.weatherapi.com/v1/forecast.json"
        params: dict[str, str | int] = {"key": api_key, "q": location, "days": 3}
        response = requests.get(url, params=params)
        response.raise_for_status()

        extracted_forecast = extract_forecast_data(response.json())
        city_country = (
            extracted_forecast[0].get("city_country", location)
            if extracted_forecast
            else location
        )

        results: list[dict[str, str | int | None]] = []
        for day in extracted_forecast:
            try:
                result = {
                    "date": day.get("date"),
                    "condition": day.get("condition"),
                    "max_temp_c": day.get("max_temp_c"),
                    "min_temp_c": day.get("min_temp_c"),
                    "chance_of_rain_pct": day.get("chance_of_rain_pct"),
                    "avg_humidity": day.get("avg_humidity"),
                    "sunrise": day.get("sunrise"),
                    "sunset": day.get("sunset"),
                    "location": city_country,
                }
                results.append(result)
            except Exception:
                continue  # Skip malformed items
        return results

    except Exception as e:
        return [
            {"error": f"An error occurred while fetching the weather data: {str(e)}"}
        ]
