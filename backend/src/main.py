import asyncio
from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from Drone import Drone
from contracts import getLocation, send_transaction

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
    addresses = ["0xe70FEB6c3191465ecfCe2dAe047c92657a9dde5A"]
    drones = []
    id = 1
    for address in addresses:
        location = getLocation(address)
        print(location)
        drones.append(Drone(id, address, location[1], location[0], "flying"))
        id += 1

    return {"drones": drones}

# Function to run updateLocation every 5 seconds in the background
async def run_location_updater():
    while True:
        await asyncio.sleep(1)  
        print("Updating drone location...")
        send_transaction("0xe70FEB6c3191465ecfCe2dAe047c92657a9dde5A")
        

# Startup event handler to trigger the background task
@app.on_event("startup")
async def start_location_updater():
    asyncio.create_task(run_location_updater())  # Launch background task on startup
