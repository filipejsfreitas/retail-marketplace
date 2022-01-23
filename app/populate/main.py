#!/usr/bin/env python3
from logger import Logger
from clients import *
from sellers import *
from categories import *
from products import *
from proposals import *

class State():
    logger = Logger()
    clients = clients
    sellers = sellers
    categories = categories
    products = products
    proposals = proposals

state = State()

add_clients(state)
add_sellers(state)
add_categories(state)
add_proposals(state)
