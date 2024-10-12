from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from Drone import Drone
from contracts import getLocation


app = FastAPI()

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
        drones.append(Drone(id, address, location[0], location[1], "flying"))
        id += 1

    return {"drones": drones}