from web3 import Web3
import os
import json
from dotenv import load_dotenv

load_dotenv()

with open('../abi/Drone.json') as abi_file:
    contract_abi = json.load(abi_file)

w3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/' + os.getenv("INFURA_API_KEY")))

def get_location(address):
    checksum_address = w3.to_checksum_address(address)
    contract_instance = w3.eth.contract(address=checksum_address, abi=contract_abi)
    location = contract_instance.functions.getLocation().call()
    return (location[0] / 10000, location[1] / 10000)

def make_bid(address, pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude):
    checksum_address = w3.to_checksum_address(address)
    contract_instance = w3.eth.contract(address=checksum_address, abi=contract_abi)
    bid = contract_instance.functions.makeBid(pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude).call()
    return bid

def send_transaction(address, lat, long):
    checksum_address = w3.to_checksum_address(address)
    contract_instance = w3.eth.contract(address=checksum_address, abi=contract_abi)

    account = "0x73b07eFFdf8c9AD8721B7e977609798F0FFBdAe3"
    # private_key = os.getenv("PRIVATE_KEY")
    if not private_key:
        raise Exception("Private key is not set in the environment variables")
    
    nonce = w3.eth.get_transaction_count(account)  # Get nonce for the transaction
    gas_price = w3.eth.gas_price  # Get the current network gas price
    transaction = contract_instance.functions.updateLocation(
        int(lat), # Increment location coordinates
        int(long)
    ).build_transaction({
        'from': account,
        'nonce': nonce,
        'gas': 300000,
        'gasPrice': int(gas_price * 1.2),
        'chainId': 11155111
    })

    # Sign the transaction with the private key
    signed_tx = w3.eth.account.sign_transaction(transaction, private_key=private_key)

    # Send the transaction to the blockchain
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)

    # Wait for the transaction receipt to ensure it is mined
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    return receipt
