#!/usr/bin/env python3
import requests
import json
import io
import sys

json_headers = {'Content-Type': 'application/json'}


def print_tabs(amount):
    for i in range(amount):
        print("  ", end="")

def add_product(product):
    print("Adding product '" + product["name"] + "'.")
    url = "http://localhost:3001/product"

    payload={
        'name': product["name"],
        'description': product.get("description", "Empty."),
        'category_id': product.get("category_id", "tmp"),
        'forSale': 'false',
        'characteristic': product.get("characteristic", "[]"),
        'tecnical': product.get("tecnical", "[]"),
        'imagesToDelete': '[]',
        'score': '0',
        'number_scores': '0',
        'best_offer': '0'
    }
    files = []

    for i in range(len(product.get('files', []))):
        img = io.BytesIO(requests.get(product['files'][i]).content)
        files.append(('images', (str(i) + '.jpg', img, 'image/jpeg')))
    response = requests.request("POST", url, headers={}, data=payload, files=files)

    #print(response.text)
    return response

def add_category(name, parent=None):
    print("Adding category '" + name + "'.")
    url = "http://localhost:3001/category/"
    payload = {"name": name}
    if parent != None:
        payload["parent_id"] = parent

    response = requests.request(
        "POST", url, headers=json_headers, data=json.dumps(payload))
    #print(response.text)
    return response.json()["data"]["_id"]


def add_categories(cats, parent=None, depth=0):
    for cat in cats:
        print_tabs(depth)
        cat["_id"] = add_category(cat["name"], parent=parent)
        for product in cat.get("products", []):
            print_tabs(depth)
            print(" *", end="")
            product["category_id"] = cat["_id"]
            add_product(product)
        if cat.get("children"):
            add_categories(cat["children"], parent=cat["_id"], depth=depth+1)


products = {
    "desktophp" : {
        "name": "HP Pavilion Gaming Desktop TG01-2003np",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/_/1_2_122_1_1.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/2/_/2_2_103_1_1.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/_/3_1_97_1_1.jpg"]
    },
    "desktophp2" : {
        "name": "HP Desktop M01-F1017np",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/_/1_2_121_1.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/_/3_1_96_1.jpg"]
    },
    "laptophp" : {
        "name": "HP 255 G8 15.6",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/_/1_168.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/4/_/4_236.jpg"]
    },
    "cpu" : {
        "name": "AMD Ryzen 7 5800X 8-Core 3.8GHz c/ Turbo 4.7GHz 36MB SktAM4",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/2/3231871-l-a.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/2/3231871-l-b.jpg"]
    },
    "cpu2" : {
        "name": "Intel Core i7-11700K 8-Core 3.6GHz c/ Turbo 5.0GHz 16MB Skt1200",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/2/3273731-l-a.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/2/3273731-l-b.jpg"]
    },
    "ram": {
        "name": "G.SKILL Trident Z5 RGB 32GB (2x16GB) DDR5-5600MHz",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/_/1_51_73.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/2/_/2_51_63.jpg"]
    },
    "ram2": {
        "name": "RAM SO-DIMM Crucial Value 8GB (1x8GB) DDR4-3200MHz CL22 Single-Ranked",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/p/r/product-p018521-64311_1_5.jpg"]
    },
    "gpu": {
        "name": "XFX Radeon RX 6700 XT Speedster QICK 319 Black Gaming 12GB GDDR6",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/6/0/604f6d1a54e3b402f2783117_6700_xt_qick_319_box_mockup_100-p-1600.jpeg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/6/0/604f6d22553b7d668ccf81b3_6700_xt_qick_319_mockup_02-p-1600.jpeg"]
    },
    "gpu2": {
        "name": "Gigabyte GeForce RTX 3080 Ti Gaming 12G GDDR6X OC",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/_/1_21_2.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/7/_/7_10_7.jpg"]
    },
    "book": {
        "name": "The Wedding Dress",
        "files": ["https://static.fnac-static.com/multimedia/Images/PT/NR/7f/6b/67/6777727/1540-1.jpg"]
    },
    "book2": {
        "name": "Honest Illusions",
        "files": ["https://static.fnac-static.com/multimedia/Images/PT/NR/7d/6b/67/6777725/1540-1.jpg"]
    },
    "book3": {
        "name": "Beautiful World, Where Are You",
        "files": ["https://static.fnac-static.com/multimedia/Images/PT/NR/53/76/6a/6977107/1540-1.jpg"]
    },
    "book4": {
        "name": "Detransition, Baby : A Novel",
        "files": ["https://static.fnac-static.com/multimedia/Images/PT/NR/44/27/75/7677764/1540-1.jpg"]
    },
}

categories = [
    {
        "name": "Computers",
        "children": [
            {"name": "Desktops", "products": [
                products["desktophp"], products["desktophp2"]]},
            {"name": "Laptops", "products": [products["laptophp"]]},
            {"name": "Components",
             "children": [
                 {"name": "Processors", "products": [
                     products["cpu"], products["cpu2"]]},
                 {"name": "GPU", "products": [
                     products["gpu"], products["gpu2"]]},
                 {"name": "Ram", "products": [
                     products["ram"], products["ram2"]]},
             ]},
        ],
    },
    {
        "name": "Books",
        "children": [
            {"name": "Romance", "products": [products["book"],products["book2"],]
             },
            {"name": "Fiction", "products": [products["book3"],products["book4"],]
             },
        ],
    },
]

program = sys.argv.pop(0)

if len(sys.argv) == 0 or sys.argv[0] != "--run":
    print("The database should be empty when populating prevent errors.")
    print("To remove the database you can use the following commands:")
    print("  mongo")
    print("  > use mongoose")
    print("  > db.dropDatabase()")
    print("To populate use '" + program + " --run'. (The server should also be running)")
else:
    add_categories(categories)