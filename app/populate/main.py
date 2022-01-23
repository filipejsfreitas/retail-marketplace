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
    proposals = []
    comments = comments
    addresses = []
    orders = []

state = State()

add_clients(state)
populate_addresses(state)
add_addresses(state)
add_sellers(state)
add_categories(state)
populate_proposals(state)
add_proposals(state)
populate_comments(state)
add_comments(state)
populate_orders(state)
add_orders(state)

state.logger.info("ended :)")