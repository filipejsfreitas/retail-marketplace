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
args = {}

while len(sys.argv) > 1:
    arg = sys.argv.pop(0)
    if arg == "--db":
        args["db"] = sys.argv.pop(0)
    elif arg == "--host":
        args["host"] = sys.argv.pop(0)
    elif arg == "--host":
        args["port"] = sys.argv.pop(0)
    elif arg == "--dbhost":
        args["dbhost"] = sys.argv.pop(0)

if not "db" in args:
    print("The database should be empty when populating prevent errors.")
    print("To remove the database you can use the following commands:")
    print("  mongo")
    print("  > use dbname")
    print("  > db.dropDatabase()")
    print("To populate use '" + program +
          " --db [dbname]'. (Both servers must be running)")
    print("Other valid parameters are '--host [hostname]' and '--port [port]'.")
    sys.exit(1)

class State():
    db = args["db"]
    host = args.get("host", "localhost")
    port = args.get("port", "3001")
    baseurl = "http://" + host + ":" + port
    dbhost = args.get("dbhost", "localhost")
    mongo = MongoClient(dbhost, 27017)[db]
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
state.logger.info("Using '" + state.dbhost + "' as database host.")
state.logger.info("Using '" + state.db + "' as selected database.")
state.logger.info("Using '" + state.baseurl + "' as backend base url.")

populate(state)

state.logger.info("ended :)")