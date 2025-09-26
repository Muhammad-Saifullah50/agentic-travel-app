import json

def extract_forecast_data(json_string:str) -> list[dict[str, str | int | None]]:
    """
    Extracts relevant forecast data for 3 days from the API response string.
    """
    try:
        data = json.loads(json_string)
    except json.JSONDecodeError:
        # Handle case where the JSON string is invalid
        return []

    # 1. Extract location information
    location = data.get('location', {})
    city_country = f"{location.get('name', 'N/A')}, {location.get('country', 'N/A')}"

    # 2. Get the forecast days (up to the first 3)
    # The 'forecastday' list holds the daily forecast data.
    forecast_days = data.get('forecast', {}).get('forecastday', [])[:3]

    extracted_data:list[dict[str, str | int | None]] = []

    # 3. Iterate over the forecast days and extract desired fields
    for day_data in forecast_days:
        day_summary = day_data.get('day', {})
        astro = day_data.get('astro', {})

        extracted_data.append({
            "city_country": city_country,
            "date": day_data.get('date'),
            "max_temp_c": day_summary.get('maxtemp_c'),
            "min_temp_c": day_summary.get('mintemp_c'),
            "condition": day_summary.get('condition', {}).get('text'),
            "avg_humidity": day_summary.get('avghumidity'),
            "chance_of_rain_pct": day_summary.get('daily_chance_of_rain'),
            "sunrise": astro.get('sunrise'),
            "sunset": astro.get('sunset'),
        })

    return extracted_data
