import asyncio
from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from Drone import Drone
from Package import Package
from contracts import getLocation, send_transaction

addresses = ["0x9C813Ac3ba8333D97d3D96A0C70e6b2dD8Ddc7A8", "0x58277E65DF3b1bB5A9bDD4AA130A1f4711b70473", "0x8b41eC3100aF936D0E4970F69d66F80B37085D75", "0xCA80257794aC965Ea52187EFae78686f8A3F0C4b", "0x0681fE329eCc94c9E45639571100511440C54B91"]

packages = [
                Package(id=1, name="Package 1", longitude_start=40.7128, latitude_start=-74.0060, longitude_dest=34.0522, latitude_dest=-118.2437, status="awaiting_assignment"),
                Package(id=2, name="Package 2", longitude_start=51.5074, latitude_start=-0.1278, longitude_dest=48.8566, latitude_dest=2.3522, status="in_transit"),
                Package(id=3, name="Package 3", longitude_start=35.6895, latitude_start=139.6917, longitude_dest=37.7749, latitude_dest=-122.4194, status="awaiting_drone")
            ]

drones = [
            Drone(id=1, address="0xe70FEB6c3191465ecfCe2dAe047c92657a9dde5A"),
            Drone(id=2, address="0x58277E65DF3b1bB5A9bDD4AA130A1f4711b70473")
]

package_id = 1

app = FastAPI()

# CORS settings
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

@app.post("/sendMessage")
async def send_message(message: Message):
    return {"response": f"Location received: {message.message}"}

@app.get("/getDrones")
async def get_drones():
    for drone in drones:
        print("ADDRESS IS: " + drone.address)
        location = getLocation(drone.address)
        print(location)
        drone.latitude = location[0]
        drone.longitude = location[1]
    return {"drones": drones}

@app.get("/getPackages")
async def get_packages():
    print(packages)
    return {"packages": packages}

@app.get("/getUncollectedPackages")
async def get_uncollected_packages():
    uncollected_statuses = {"awaiting_assignment", "awaiting_drone"}
    uncollected_packages = [package for package in packages if package.status in uncollected_statuses]
    return {"packages": uncollected_packages}

@app.post("/addPackage")
async def submit_package(package: Package):
    print(f"Received package: {package}")
    global package_id
    package.id = package_id
    package_id += 1
    packages.append(package)
    for drone in drones:
        print("bazinga")
    return {"message": "Package submitted successfully", "package": package}

# Function to run updateLocation every 5 seconds in the background
async def update_location(address, dest_lat, dest_long):
    location = getLocation(address)
    curr_lat = location[0]
    curr_long = location[1]
    increments = 8
    for i in range(8):
        await asyncio.sleep(1)  
        print("Updating drone location...")
        send_transaction(address, lat_incement, long_increment)
        

# Startup event handler to trigger the background task
@app.on_event("startup")
async def update_location():
    # asyncio.create_task(run_location_updater())  # Launch background task on startup
    print("bazinga")
