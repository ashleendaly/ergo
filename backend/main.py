from fastapi import FastAPI
from pydantic import BaseModel
from Drone import Drone

app = FastAPI()

class Message(BaseModel):
    message: str

@app.post("/sendMessage")
async def send_message(message: Message):
    return {"response": f"Location received: {message.message}"}

@app.get("/getDrones")
async def get_location():
    test_drone = Drone(1, "001", 55.843670, -4.351840, "flying")
    return test_drone
