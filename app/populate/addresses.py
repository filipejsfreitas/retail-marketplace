import requests
import json
from headers import auth_headers

addresses = [
    {"nif": "string", "address": "string", "postal_code": "string",
        "name": "string", "contact": "string", "clientKey": "client"}
]


def add_address(state, address):
    url = "http://localhost:3001/address"
    state.logger.info("Adding address on '" + address["clientKey"] + "'.")

    payload = {}
    for key in ["nif", "address", "postal_code", "name", "contact"]:
        payload[key] = address[key]

    rep = requests.request(
        "POST", url, headers=auth_headers(state.clients[address["clientKey"]]["token"]), data=json.dumps(payload))
    address["_id"] = rep.json()["data"]["_id"]


def add_addresses(state):
    for address in state.addresses:
        add_address(state, address)
