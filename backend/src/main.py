import asyncio
from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from Drone import Drone
from Package import Package
from contracts import getLocation, send_transaction
import math

packages = [
                Package(id=1, name="Package 1", longitude_start=-4.269, latitude_start=55.85, longitude_dest=-4.30, latitude_dest=55.89, status="awaiting_assignment"),
            ]

drones = [
            Drone(id=1, address="0xe70FEB6c3191465ecfCe2dAe047c92657a9dde5A"),
            # Drone(id=2, address="0x58277E65DF3b1bB5A9bDD4AA130A1f4711b70473"),
            # Drone(id=3, address="0x8b41eC3100aF936D0E4970F69d66F80B37085D75"),
            Drone(id=4, address="0xCA80257794aC965Ea52187EFae78686f8A3F0C4b"),
            Drone(id=5, address="0x0681fE329eCc94c9E45639571100511440C54B91")
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
    global package_id
    package.id = package_id
    package_id += 1
    packages.append(package)

    minimum_bid = math.inf
    winning_drone_address = ""
    for drone in drones:
        bid = make_bid(drone.address, int(package.latitude_start)*10000, int(package.longitude_start)*10000, int(package.latitude_dest)*10000, int(package.longitude_dest)*10000)
        if bid < minimum_bid:
            minimum_bid = bid
            winning_drone_address = drone.address
    return {"message": "Package submitted successfully", "package": package, "winning_drone_address" : winning_drone_address}

async def update_location(address, dest_lat, dest_long):
    location = getLocation(address)
    curr_lat = location[0]
    curr_long = location[1]
    increments = 5
    increment_lat = (int(float(dest_lat)*10000)-curr_lat)/increments
    increment_long = (int(float(dest_long)*10000)-curr_long)/increments
    for i in range(increments):
        await asyncio.sleep(1)  
        print("Updating drone location...")
        print(curr_lat+((i+1)*increment_lat))
        print(curr_long+((i+1)*increment_long))
        send_transaction(address, curr_lat+((i+1)*increment_lat), curr_long+((i+1)*increment_long))
        

