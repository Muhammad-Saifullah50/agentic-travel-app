from pydantic import BaseModel, HttpUrl

class Place(BaseModel):
    id: int
    image_url: HttpUrl
    title: str
    description: str
    rating: float
    location: str
    category: str


class PlacesResponse(BaseModel):
    message: str
    type: str = "places"
    data: list[Place]