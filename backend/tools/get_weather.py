from agents import function_tool
import requests_cache
from retry_requests import retry  # type: ignore
import openmeteo_requests  # type: ignore
from typing import Dict, Any
import logging
from utils.format_date import format_date

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

@function_tool
def get_weather(location: str, start_date: str, end_date: str, latitude: float, longitude: float) -> str:
    try:


        formatted_start_date = format_date(start_date)
        formatted_end_date = format_date(end_date)

        # Setup the Open-Meteo API client with cache and retry on error
        cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
        retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
        openmeteo = openmeteo_requests.Client(session=retry_session)

        # Make sure all required weather variables are listed here
        # The order of variables in hourly or daily is important to assign them correctly below
        url = "https://api.open-meteo.com/v1/forecast"
        params: Dict[str, Any] = {
            "latitude": latitude,
            "longitude": longitude,
            "daily": [
                "sunrise", "temperature_2m_max", "temperature_2m_min", "precipitation_sum", "precipitation_hours", "precipitation_probability_max", "uv_index_max", "sunset", "sunshine_duration", "daylight_duration", "apparent_temperature_max", "apparent_temperature_min"
            ],
            "start_date": formatted_start_date,
            "end_date": formatted_end_date,
            "timezone": "auto"
        }

        responses = openmeteo.weather_api(url, params=params)
        response = responses[0]
        logger.debug(f"Weather response: {response}")

        # Process daily data. The order of variables needs to be the same as requested.
        daily = response.Daily()
        daily_sunrise = daily.Variables(0).ValuesInt64AsNumpy()
        daily_temperature_2m_max = daily.Variables(1).ValuesAsNumpy()
        daily_temperature_2m_min = daily.Variables(2).ValuesAsNumpy()
        daily_precipitation_sum = daily.Variables(3).ValuesAsNumpy()
        daily_precipitation_hours = daily.Variables(4).ValuesAsNumpy()
        daily_precipitation_probability_max = daily.Variables(5).ValuesAsNumpy()
        daily_uv_index_max = daily.Variables(6).ValuesAsNumpy()
        daily_sunset = daily.Variables(7).ValuesInt64AsNumpy()
        daily_sunshine_duration = daily.Variables(8).ValuesAsNumpy()
        daily_daylight_duration = daily.Variables(9).ValuesAsNumpy()
        daily_apparent_temperature_max = daily.Variables(10).ValuesAsNumpy()
        daily_apparent_temperature_min = daily.Variables(11).ValuesAsNumpy()

        import pandas as pd
        daily_data = {
            "date": pd.date_range(
                start=pd.to_datetime(daily.Time(), unit="s", utc=True),
                end=pd.to_datetime(daily.TimeEnd(), unit="s", utc=True),
                freq=pd.Timedelta(seconds=daily.Interval()),
                inclusive="left"
            )
        }
        daily_data["sunrise"] = daily_sunrise
        daily_data["temperature_2m_max"] = daily_temperature_2m_max
        daily_data["temperature_2m_min"] = daily_temperature_2m_min
        daily_data["precipitation_sum"] = daily_precipitation_sum
        daily_data["precipitation_hours"] = daily_precipitation_hours
        daily_data["precipitation_probability_max"] = daily_precipitation_probability_max
        daily_data["uv_index_max"] = daily_uv_index_max
        daily_data["sunset"] = daily_sunset
        daily_data["sunshine_duration"] = daily_sunshine_duration
        daily_data["daylight_duration"] = daily_daylight_duration
        daily_data["apparent_temperature_max"] = daily_apparent_temperature_max
        daily_data["apparent_temperature_min"] = daily_apparent_temperature_min
        
        return f'Daily weather data for {location} from {formatted_start_date} to {formatted_end_date}:\n' + \
               '\n'.join([f"{date.strftime('%Y-%m-%d')}: Max Temp: {max_temp}°C, Min Temp: {min_temp}°C, Precipitation: {precipitation}mm" 
                           for date, max_temp, min_temp, precipitation in zip(daily_data["date"], daily_data["temperature_2m_max"], 
                                                                               daily_data["temperature_2m_min"], daily_data["precipitation_sum"])])
    except Exception as e:
        logger.error(f"Error fetching weather data: {e}")
        return f"An error occurred while fetching the weather data: {str(e)}"