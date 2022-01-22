import requests
import json
from headers import default_headers
from names import first_name, last_name

sellers = {
    "seller": { "companyName": "string", "tin": "string", "companyPhoneNumber": "string", "customerServiceEmail": "user@example.com"}
}

for seller in sellers:
    sellers[seller]["email"] = seller + "@email.com"
    sellers[seller]["firstName"] = first_name()
    sellers[seller]["lastName"] = last_name()
    sellers[seller]["password"] = "123456"
    sellers[seller]["passwordConfirmation"] = "123456"

def login_seller(logger, sellerKey):
    seller = sellers[sellerKey]
    url = "http://localhost:3001/auth/login"
    logger.info("Login in seller '" + sellerKey + "'.")

    payload = {}
    for key in ["email", "password"]:
        payload[key] = seller[key]

    rep = requests.request("POST", url, headers=default_headers(), data=json.dumps(payload))
    seller["token"] = "Bearer " + rep.json()["token"]

def add_seller(logger, sellerKey):
    seller = sellers[sellerKey]
    url = "http://localhost:3001/auth/register/seller"
    logger.info("Adding seller '" + sellerKey + "'.")

    payload = {}
    for key in ["email", "password", "passwordConfirmation", "firstName", "lastName", "companyName", "tin", "companyPhoneNumber", "customerServiceEmail"]:
        payload[key] = seller[key]

    rep = requests.request("POST", url, headers=default_headers(), data=json.dumps(payload))
    login_seller(logger, sellerKey)

def add_sellers(state):
    for seller in state.sellers:
        add_seller(state.logger, seller)