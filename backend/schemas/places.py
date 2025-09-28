from pydantic import BaseModel, HttpUrl

class Place(BaseModel):
    id: int
    title: str
    description: str
    price: str | int
    thumbnail: HttpUrl


class PlacesResponse(BaseModel):
    message: str
    type: str = "places"
    data: list[Place]