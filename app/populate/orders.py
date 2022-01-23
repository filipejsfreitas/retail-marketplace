import random
import datetime
from bson.objectid import ObjectId

#{
#	"_id": "61eca2bf332f07b7e2d0aa82",
#	"client_id": "61eca272332f07b7e2d0aa10",
#	"date": ISODate("2022-01-23T00:35:11Z"),
#	"total": 20,
#	"address": {
#		"nif": "string",
#		"address": "string",
#		"postal_code": "string",
#		"name": "string",
#		"contact": "string",
#		"_id": ObjectId("61eca2bf332f07b7e2d0aa83")
#	},
#	"items": [{
#		"quantity": 1,
#		"price": 10,
#		"shipping": 10,
#		"product_id": "61eca273332f07b7e2d0aa26",
#		"proposal_id": "61eca275332f07b7e2d0aa36",
#		"seller_id": "61eca272332f07b7e2d0aa18",
#		"state": "indefinido",
#		"special_conditions": "",
#		"_id": ObjectId("61eca2bf332f07b7e2d0aa84")
#	}],
#	"__v": 0
#}


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
#	"seller_id": order["client"]["_id"],
#	"date": datetime.datetime.utcnow(),
#	"total": 20,
#	"address": {
#	},
#    "state": "processing",
#	"items": [{
#            "quantity": order["quantity"],
#          		"price": order["proposal"]["price"],
#          		"shipping": order["proposal"]["shipping"],
#          		"product_id": order["product"]["_id"],
#          		"proposal_id": order["proposal"]["_id"],
#          		"special_conditions": "",
#          		"_id": ObjectId("000000000000000000000000")
#	}]})


def add_orders(state):
    for order in state.orders:
        add_order(state, order)
