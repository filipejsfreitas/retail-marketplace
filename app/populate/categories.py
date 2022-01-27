import requests
import json
from headers import default_headers
from products import add_product

categories = [
    {
        "name": "Computers",
        "children": [
            {"name": "Desktops", "productKeys": [ "desktophp", "desktophp2"]},
            {"name": "Laptops", "productKeys": ["laptophp"]},
            {"name": "Components",
             "children": [
                 {"name": "Processors", "productKeys": [ "cpu", "cpu2"]},
                 {"name": "GPU", "productKeys": [ "gpu", "gpu2"]},
                 {"name": "Ram", "productKeys": [ "ram", "ram2"]},
             ]},
        ],
    },
    {
        "name": "Books",
        "children": [
            {"name": "Romance", "productKeys": ["book", "book2"] },
            {"name": "Fiction", "productKeys": ["book3", "book4"] },
        ],
    },
    {
        "name": "Eletronics",
        "children": [
            {"name": "Phones", "productKeys": ["phone1", "phone2"]},
            {"name": "Tablets", "productKeys": ["tablet1", "tablet2"]},
            {"name": "Headphones", "productKeys": [
                "headphones1", "headphones2"]},
        ],
    },
]

def add_category(state, category, parent=None):
    url = state.baseurl + "/category/"
    state.logger.info("Adding category '" + category["name"] + "'.")
    payload = {"name": category["name"]}
    if parent != None:
        payload["parent_id"] = parent

    try:
        state.logger.push()
        response = requests.request("POST", url, headers=default_headers(), data=json.dumps(payload))
        if not response.ok:
            raise Exception()
        category["_id"] = response.json()["data"]["_id"]

        for subcategory in category.get("children", []):
            add_category(state, subcategory, parent=category["_id"])

        for productKey in category.get("productKeys", []):
            product = state.products[productKey]
            product["category_id"] = category["_id"]
            add_product(state, product)
    #except Exception:
    #    state.logger.warn("Failed to add category '" + category["name"] + "'.")
    finally:
        state.logger.pop()


def add_categories(state):
    for category in state.categories:
        add_category(state, category)