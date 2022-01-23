import requests
import json
import jwt
import random
from headers import default_headers, auth_headers
from names import first_name, last_name

sellers = {
    "pcdiga": {"companyName": "PCDiga"},
    "seller": {"companyName": "Seller"},
}

for i in range(0,5):
    sellers["seller" + str(i)] = {"companyName": "Seller" + str(i)}

random.seed(0)

for seller in sellers:
    sellers[seller]["email"] = seller + "@email.com"
    sellers[seller]["firstName"] = first_name()
    sellers[seller]["lastName"] = last_name()
    sellers[seller]["password"] = "123456"
    sellers[seller]["passwordConfirmation"] = "123456"
    sellers[seller]["customerServiceEmail"] = seller + ".noreply@email.com"
    sellers[seller]["companyPhoneNumber"] = "25801234"
    sellers[seller]["tin"] = str(random.randrange(100000000, 999999999))

def login_seller(logger, sellerKey):
    seller = sellers[sellerKey]
    url = "http://localhost:3001/auth/login"
    logger.info("Login in seller '" + sellerKey + "'.")

    payload = {}
    for key in ["email", "password"]:
        payload[key] = seller[key]

    rep = requests.request("POST", url, headers=default_headers(), data=json.dumps(payload))
    seller["token"] = "Bearer " + rep.json()["token"]

    seller["_id"] = jwt.decode(rep.json()["token"], options={"verify_signature": False})["_id"]

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