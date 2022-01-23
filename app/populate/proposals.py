import requests
import json
from headers import auth_headers

proposals = [
    {"price": 10, "shipping": 10, "stock": 10, "maxPerPurchase": 10,
        "sellerKey": "seller", "productKey": "desktophp"}
]

for proposal in proposals:
    proposal["special_conditions"] = ""



def add_proposal(state, proposal):
    url = "http://localhost:3001/proposal"
    state.logger.info("Adding proposal on '" + proposal["productKey"] + "'.")

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