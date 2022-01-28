import requests
import json
import random
from headers import auth_headers


def generate_address(state, clientKey):
    return {"nif": "string", "address": "string", "postal_code": "string",
            "name": "string", "contact": "string", "clientKey": clientKey}


def populate_addresses(state):
    state.logger.info("Generating addresses.")
    for clientKey in state.clients:
        state.addresses.append(generate_address(state, clientKey))


def add_address(state, address):
    url = state.baseurl + "/address"
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
