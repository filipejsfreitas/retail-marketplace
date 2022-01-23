import requests
import json
from headers import auth_headers

comments = [
    {"title": "Title", "comment": "Comment", "score": 4,
        "clientKey": "client", "productKey": "desktophp"}
]

def add_comment(state, comment):
    url = "http://localhost:3001/product/" + \
        state.products[comment["productKey"]]["_id"] + "/comment"
    state.logger.info("Adding comment on '" + comment["productKey"] + "'.")

    payload = {}
    for key in ["title", "comment", "score"]:
        payload[key] = comment[key]

    rep = requests.request(
        "POST", url, headers=auth_headers(state.clients[comment["clientKey"]]["token"]), data=json.dumps(payload))
    comment["_id"] = rep.json()["data"]["_id"]

def add_comments(state):
    for comment in state.comments:
        add_comment(state, comment)