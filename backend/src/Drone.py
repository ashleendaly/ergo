class Drone:
    def __init__(self, id: int, address: str, longitude: float, latitude: float, status: str):
        self.id = id
        self.address = address
        self.longitude = longitude
        self.latitude = latitude
        self.status = status