from pydantic import BaseModel

class Package(BaseModel):
    id: int
    name: str
    longitude_start: float
    latitude_start: float
    longitude_dest: float
    latitude_dest: float
    status: str
