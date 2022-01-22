import requests
import json
from headers import default_headers
from names import first_name, last_name

clients = {
    "client": {}
}

for client in clients:
    clients[client]["email"] = client + "@email.com"
    clients[client]["firstName"] = first_name()
    clients[client]["lastName"] = last_name()
    clients[client]["password"] = "123456"
    clients[client]["passwordConfirmation"] = "123456"

def login_client(logger, clientKey):
    client = clients[clientKey]
    url = "http://localhost:3001/auth/login"
    logger.info("Login in client '" + clientKey + "'.")

    payload = {}
    for key in ["email", "password"]:
        payload[key] = client[key]

    rep = requests.request("POST", url, headers=default_headers(), data=json.dumps(payload))
    client["token"] = "Bearer " + rep.json()["token"]

def add_client(logger, clientKey):
    client = clients[clientKey]
    url = "http://localhost:3001/auth/register/client"
    logger.info("Adding client '" + clientKey + "'.")

    payload = {}
    for key in ["email", "password", "passwordConfirmation", "firstName", "lastName"]:
        payload[key] = client[key]

    rep = requests.request("POST", url, headers=default_headers(), data=json.dumps(payload))
    login_client(logger, clientKey)

def add_clients(state):
    for client in state.clients:
        add_client(state.logger, client)