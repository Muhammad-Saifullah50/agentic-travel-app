from agents import function_tool
import requests_cache

from retry_requests import retry  # type: ignore
import openmeteo_requests  # type: ignore


@function_tool
def get_weather(latitude: float, longitude: float, start_date: str, end_date: str) -> str:
    print('weather tool called')
    # Setup the Open-Meteo API client with cache and retry on error
    cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
    retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
    openmeteo = openmeteo_requests.Client(session = retry_session)
    
    # Make sure all required weather variables are listed here
    # The order of variables in hourly or daily is important to assign them correctly below
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "daily": True,
    }
    responses = openmeteo.weather_api(url, params=params)

    response = responses[0]

    daily_data = response.Daily()

    if not daily_data:
        return f"No weather data found for the coordinates: {latitude}, {longitude}."
    
    return f"""Weather forecast for coordinates: {latitude}, {longitude} from {start_date} to {end_date}: {daily_data}"""