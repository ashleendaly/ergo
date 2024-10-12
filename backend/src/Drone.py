from typing import Optional

from pydantic import BaseModel

class Drone(BaseModel):
    id: int
    address: str
    longitude: Optional[float] = None
    latitude: Optional[float] = None
    status: str = "inactive"