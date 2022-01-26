import random
import datetime
from bson.objectid import ObjectId


def generate_order(state, date, address, proposal):
    ret = {}
    ret["date"] = date
    ret["address"] = address
    ret["client"] = state.clients[ret["address"]["clientKey"]]
    ret["proposal"] = proposal
    ret["product"] = state.products[ret["proposal"]["productKey"]]
    ret["seller"] = state.sellers[ret["proposal"]["sellerKey"]]
    ret["quantity"] = random.randrange(2) + 1
    rand = random.random()
    if rand < 0.6:
        ret["state"] = "complete"
    elif rand < 0.8:
        ret["state"] = "sent"
    else:
        ret["state"] = "processing"

    return ret


def populate_orders(state):
    random.seed(0)
    state.logger.info("Generating orders.")
    date = datetime.datetime(2021, 9, 1)
    while date <= datetime.datetime.now():
        for address in state.addresses:
            for proposal in state.proposals:
                if random.random() < 0.015:
                    state.orders.append(generate_order(state, date, address, proposal))
        date += datetime.timedelta(days=1)


def add_order(state, order):
    state.logger.info("Adding order on client '" + order["address"]["clientKey"] + "', seller '" + order["proposal"]["sellerKey"] + "'.")
    addr = {"nif": order["address"]["nif"], "address": order["address"]["address"], "postal_code": order["address"]["postal_code"],
            "name": order["address"]["name"], "contact": order["address"]["contact"], "_id": ObjectId()}
    date = order["date"]
    total = order["proposal"]["shipping"] * \
        order["proposal"]["shipping"] * order["quantity"]
    clientItems = [{
        "quantity": order["quantity"],
        "price": order["proposal"]["price"],
        "shipping": order["proposal"]["shipping"],
        "product_id": order["product"]["_id"],
        "proposal_id": order["proposal"]["_id"],
        "seller_id": order["seller"]["_id"],
        "state": order["state"],
        "special_conditions": "",
        "_id": ObjectId(),
    }]
    sellerItems = [{
        "quantity": order["quantity"],
        "price": order["proposal"]["price"],
        "shipping": order["proposal"]["shipping"],
        "product_id": order["product"]["_id"],
        "proposal_id": order["proposal"]["_id"],
        "_id": ObjectId(),
    }]

    invoice_id = state.mongo["clientinvoices"].insert_one({
        "client_id": order["client"]["_id"],
        "date": date,
        "address": addr,
        "total": total,
        "items": clientItems,
    }).inserted_id

    state.mongo["sellerinvoices"].insert_one({
        "date": date,
        "invoice_id": invoice_id,
        "seller_id": order["seller"]["_id"],
        "total": total,
        "address": addr,
        "items": sellerItems,
        "state": order["state"],
    })


def add_orders(state):
    for order in state.orders:
        add_order(state, order)
