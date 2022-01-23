import random
import datetime
from bson.objectid import ObjectId


def random_order(state):
    ret = {}
    ret["address"] = state.addresses[random.randrange(len(state.addresses))]
    ret["client"] = state.clients[ret["address"]["clientKey"]]
    ret["proposal"] = state.proposals[random.randrange(len(state.proposals))]
    ret["product"] = state.products[ret["proposal"]["productKey"]]
    ret["seller"] = state.sellers[ret["proposal"]["sellerKey"]]
    ret["quantity"] = random.randrange(2) + 1

    return ret


def populate_orders(state):
    state.logger.info("Generating orders.")
    state.orders.append(random_order(state))


def add_order(state, order):
    addr = {"nif": order["address"]["nif"], "address": order["address"]["address"], "postal_code": order["address"]["postal_code"],
            "name": order["address"]["name"], "contact": order["address"]["contact"], "_id": ObjectId()}
    date = datetime.datetime.utcnow()
    total = order["proposal"]["shipping"] * \
        order["proposal"]["shipping"] * order["quantity"]
    clientItems = [{
        "quantity": order["quantity"],
        "price": order["proposal"]["price"],
        "shipping": order["proposal"]["shipping"],
        "product_id": order["product"]["_id"],
        "proposal_id": order["proposal"]["_id"],
        "seller_id": order["seller"]["_id"],
        "state": 'indefinido',
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
        "state": "processing",
    })


def add_orders(state):
    for order in state.orders:
        add_order(state, order)
