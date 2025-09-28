from typing import Optional
from pydantic import AnyUrl, BaseModel

class Place(BaseModel):
    id: int
    title: str
    description: str
    price: str | int
    thumbnail: Optional[AnyUrl] = None  

class Weather(BaseModel):
    date: str
    condition: str
    max_temp_c: int
    min_temp_c: int
    chance_of_rain_pct: int
    avg_humidity: int
    sunrise: str
    sunset: str
    location: str


class ItineraryResponse(BaseModel):
    message: str
    type: str = "itinerary"
    data: list[dict[str, list[Place] | list[Weather] | str]]  # Each day with places and weather