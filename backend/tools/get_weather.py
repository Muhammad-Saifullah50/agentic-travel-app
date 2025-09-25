from agents import function_tool
import requests
from utils.extract_forecast_data import extract_forecast_data
import os
from dotenv import load_dotenv


@function_tool
def get_weather(location: str) -> str:
    try:

        load_dotenv()

        api_key = os.getenv("WEATHER_API_KEY")

        url = "https://api.weatherapi.com/v1/forecast.json"

        params = {"key": api_key, "q": location, "days": 3}

        response = requests.get(url, params=params)

        extracted_forecast = extract_forecast_data(response.json())

        # Get the location from the first entry to use in the header
        location = extracted_forecast[0].get("City_Country")

        # Use a list comprehension to format each day's data
        formatted_daily_data = [
            f"Date: {day['Date']}, Condition: {day['Condition']}\n"
            f"    Max Temp: {day['Max_Temp_C']}°C, Min Temp: {day['Min_Temp_C']}°C\n"
            f"    Chance of Rain: {day['Chance_of_Rain_pct']}%, Avg Humidity: {day['Avg_Humidity']}\n"
            f"    Sunrise: {day['Sunrise']}, Sunset: {day['Sunset']}"
            for day in extracted_forecast
        ]

        # Join the strings with newlines and add the header
        final_string = f"Daily weather data for {location}:\n" + "\n".join(
            formatted_daily_data
        )

        return final_string

    except Exception as e:
        print(f"Error fetching weather data: {e}")
        return f"An error occurred while fetching the weather data: {str(e)}"
