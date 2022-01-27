#!/usr/bin/env python3
import sys
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


def populate(state):
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


program = sys.argv.pop(0)

if len(sys.argv) == 0 or len(sys.argv) != 2:
    print (len(sys.argv))
    print("The database should be empty when populating prevent errors.")
    print("To remove the database you can use the following commands:")
    print("  mongo")
    print("  > use dbname")
    print("  > db.dropDatabase()")
    print("To populate use '" + program +
          " --db [dbname]'. (Both servers must be running)")
elif sys.argv.pop(0) == "--db" and len(sys.argv) == 1:
    class State():
        mongo = MongoClient("localhost", 27017)[sys.argv.pop(0)]
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

    populate(state)
    state.logger.info("ended :)")
