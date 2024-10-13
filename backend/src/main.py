import asyncio
from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from Drone import Drone
from Package import Package
from contracts import getLocation, send_transaction

addresses = ["0xe70FEB6c3191465ecfCe2dAe047c92657a9dde5A", "0x94D4709Af9575a502bD5DFF661Bb1d566979D93d"]

packages = []

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
    drones = []
    id = 1
    for address in addresses:
        location = getLocation(address)
        print(location)
        drones.append(Drone(
            id=id,
            address=address,
            longitude=location[1],
            latitude=location[0],
            status="flying"
        ))
        id += 1

    return {"drones": drones}

@app.get("/getPackages")
async def get_packages():
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
    for address in addresses:
        print("bazinga")
    return {"message": "Package submitted successfully", "package": package}

# Function to run updateLocation every 5 seconds in the background
async def run_location_updater():
    while True:
        await asyncio.sleep(1)  
        print("Updating drone location...")
        send_transaction("0xe70FEB6c3191465ecfCe2dAe047c92657a9dde5A")
        

# Startup event handler to trigger the background task
@app.on_event("startup")
async def start_location_updater():
    # asyncio.create_task(run_location_updater())  # Launch background task on startup
    print("bazinga")
