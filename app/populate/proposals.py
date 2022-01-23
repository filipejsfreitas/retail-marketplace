import requests
import json
import random
from headers import auth_headers


def generate_proposal(state, sellerKey, productKey):
    minprice = state.products[productKey].get("minprice", 10)
    maxprice = state.products[productKey].get("maxprice", 100)
    return {
        "price": random.randrange(minprice, maxprice), "shipping": random.randrange(1, 10),
        "stock": random.randrange(1, 50), "maxPerPurchase": random.randrange(1, 10),
        "sellerKey": sellerKey, "productKey": productKey,
        "special_conditions": "",
    }


def populate_proposals(state):
    random.seed(0)
    state.logger.info("Generating proposals.")
    print(list(state.sellers.keys()))
    for sellerKey in state.sellers:
        for productKey in state.products:
            if random.random() < 0.3:
                state.proposals.append(generate_proposal(
                    state, sellerKey, productKey))


def add_proposal(state, proposal):
    url = "http://localhost:3001/proposal"
    state.logger.info("Adding proposal on '" + proposal["productKey"] + "' from '" + proposal["sellerKey"] + "'.")

    proposal["product_id"] = state.products[proposal["productKey"]]["_id"]
    payload = {}
    for key in ["price", "shipping", "stock", "maxPerPurchase", "product_id", "special_conditions"]:
        payload[key] = proposal[key]

    rep = requests.request(
        "POST", url, headers=auth_headers(state.sellers[proposal["sellerKey"]]["token"]), data=json.dumps(payload))
    proposal["_id"] = rep.json()["data"]["_id"]


def add_proposals(state):
    for proposal in state.proposals:
        add_proposal(state, proposal)
