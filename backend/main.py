from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from Drone import Drone

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
async def get_location():
    test_drone1 = Drone(1, "001", 55.843670, -4.351840, "flying")
    test_drone2 = Drone(2, "002", 55.873120, -4.287790, "waiting")

    drones = [test_drone1.__dict__, test_drone2.__dict__]

    return {"drones": drones}