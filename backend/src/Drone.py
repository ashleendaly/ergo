from pydantic import BaseModel

class Drone(BaseModel):
    id: int
    address: str
    longitude: float
    latitude: float
    status: str