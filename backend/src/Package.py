class Package:
    def __init__(self, id: int,  name : str, longitude_start: float, latitude_start: float, longitude_dest: float, latitude_dest: float, status: str):
        self.id = id
        self.name = name
        self.longitude_start = longitude_start
        self.latitude_start = latitude_start
        self.longitude_dest = longitude_dest
        self.latitude_dest = latitude_dest
