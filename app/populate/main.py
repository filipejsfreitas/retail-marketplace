#!/usr/bin/env python3
from pymongo import MongoClient
from logger import Logger
from clients import *
from sellers import *
from categories import *
from products import *
from proposals import *
from comments import *
from addresses import *
from orders import *

class State():
    baseurl = "http://localhost:3001"
    mongo = MongoClient("localhost", 27017)["retail"]
    logger = Logger()
    clients = clients
    sellers = sellers
    categories = categories
    products = products
    proposals = proposals
    comments = comments
    addresses = addresses
    orders = []

state = State()

add_clients(state)
add_addresses(state)
add_sellers(state)
add_categories(state)
add_proposals(state)
add_comments(state)
populate_orders(state)
add_orders(state)