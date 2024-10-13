import asyncio
from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from Drone import Drone
from Package import Package
from contracts import getLocation, send_transaction, make_bid
import math

packages = []

drones = [
            Drone(id=1, address="0x58277E65DF3b1bB5A9bDD4AA130A1f4711b70473"),
            Drone(id=2, address="0x8b41eC3100aF936D0E4970F69d66F80B37085D75"),
            Drone(id=3, address="0xCA80257794aC965Ea52187EFae78686f8A3F0C4b"),
            Drone(id=4, address="0x0681fE329eCc94c9E45639571100511440C54B91")
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
        location = getLocation(drone.address)
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

    int_package_latitude_start = int(package.latitude_start * 10000)
    int_package_longitude_start = int(package.longitude_start * 10000)

    int_package_latitude_dest = int(package.latitude_dest * 10000)
    int_package_longitude_dest = int(package.longitude_dest *10000)


    # get winning drone
    minimum_bid = math.inf
    winning_drone_address = ""
    winning_drone = None
    for drone in drones:
        print(drone.address, int_package_latitude_start, int_package_longitude_start, int_package_latitude_dest, int_package_longitude_dest)
        bid = make_bid(drone.address, int_package_latitude_start, int_package_longitude_start, int_package_latitude_dest, int_package_longitude_dest)
        if bid < minimum_bid:
            minimum_bid = bid
            winning_drone = drone
            winning_drone_address = drone.address

    # update drone location to pick package
    await update_location(winning_drone_address, int_package_latitude_start, int_package_longitude_start)

    # set status to picked up package
    winning_drone.status = "transporting package"

    # set package to picked up
    package.status = "picked up"

    # update drone location to drop off point
    await update_location(winning_drone_address, int_package_latitude_dest, int_package_longitude_dest)

    # set status to pending
    winning_drone.status = "pending"

    # delete package
    packages.remove(package)

    return {"message": "Package dropped"}

async def update_location(address, dest_lat, dest_long):
    location = getLocation(address)
    curr_lat = int(location[0] * 10000)
    curr_long = int(location[1] * 10000)
    increments = 3
    increment_lat = (int(float(dest_lat))-curr_lat)/increments
    increment_long = (int(float(dest_long))-curr_long)/increments
    for i in range(increments):
        await asyncio.sleep(1)  
        print("Updating drone location...")
        print(curr_lat+((i+1)*increment_lat))
        print(curr_long+((i+1)*increment_long))
        await send_transaction(address, int(curr_lat+((i+1)*increment_lat)), int(curr_long+((i+1)*increment_long)))
        

