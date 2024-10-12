from web3 import Web3
import os
import json
from dotenv import load_dotenv

load_dotenv()

with open('abi/Drone.json') as abi_file:
    contract_abi = json.load(abi_file)

w3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/' + os.getenv("INFURA_API_KEY")))

address = '0xe70FEB6c3191465ecfCe2dAe047c92657a9dde5A'
checksum_address = Web3.to_checksum_address(address)
contract_instance = w3.eth.contract(address=checksum_address, abi=contract_abi)

location = contract_instance.functions.getLocation().call()