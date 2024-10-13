from web3 import Web3
import os
import json
from dotenv import load_dotenv

load_dotenv()

with open('../abi/Drone.json') as abi_file:
    contract_abi = json.load(abi_file)

w3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/' + os.getenv("INFURA_API_KEY")))

def getLocation(address):
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
    location = contract_instance.functions.getLocation().call()

    account = "0x73b07eFFdf8c9AD8721B7e977609798F0FFBdAe3"
    private_key = os.getenv("PRIVATE_KEY")
    if not private_key:
        raise Exception("Private key is not set in the environment variables")
    
    nonce = w3.eth.get_transaction_count(account)  # Get nonce for the transaction
    transaction = contract_instance.functions.updateLocation(
        int(lat),  # Increment location coordinates
        int(long)
    ).build_transaction({
        'from': account,
        'nonce': nonce,
        'gas': 200000,  # Set an appropriate gas limit
        'gasPrice': w3.to_wei('20', 'gwei'),  # Set an appropriate gas price
        'chainId': 11155111  # Chain ID for Sepolia Testnet
    })

    # Sign the transaction with the private key
    signed_tx = w3.eth.account.sign_transaction(transaction, private_key=private_key)

    # Send the transaction to the blockchain
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)

    # Wait for the transaction receipt to ensure it is mined
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    return receipt
