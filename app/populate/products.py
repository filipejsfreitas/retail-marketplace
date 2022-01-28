import requests
import json
import io

products = {
    "desktophp" : {
        "name": "HP Pavilion Gaming Desktop TG01-2003np",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/_/1_2_122_1_1.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/2/_/2_2_103_1_1.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/_/3_1_97_1_1.jpg"],
        "minprice": 700, "maxprice": 800,
        "description": "Play on your own terms. This powerful line-up is designed to keep pace with current and new game releases. Underneath the compact and sleek outer shell, you’ll find everything you need for gaming performance, as well as space for new expansions and upgrades.",
        "characteristic": '[{"name": "color", "value": "black"}]',
        "tecnical": '["CPU: Intel Core i5"]'
    },
    "desktophp2" : {
        "name": "HP Desktop M01-F1017np",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/_/1_2_121_1.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/_/3_1_96_1.jpg"],
        "minprice": 300, "maxprice": 400,
    },
    "laptophp" : {
        "name": "HP 255 G8 15.6",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/_/1_168.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/4/_/4_236.jpg"],
        "minprice": 500, "maxprice": 700,
    },
    "cpu" : {
        "name": "AMD Ryzen 7 5800X 8-Core 3.8GHz c/ Turbo 4.7GHz 36MB SktAM4",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/2/3231871-l-a.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/2/3231871-l-b.jpg"],
        "minprice": 400, "maxprice": 600,
    },
    "cpu2" : {
        "name": "Intel Core i7-11700K 8-Core 3.6GHz c/ Turbo 5.0GHz 16MB Skt1200",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/2/3273731-l-a.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/3/2/3273731-l-b.jpg"],
        "minprice": 500, "maxprice": 700,
    },
    "ram": {
        "name": "G.SKILL Trident Z5 RGB 32GB (2x16GB) DDR5-5600MHz",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/_/1_51_73.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/2/_/2_51_63.jpg"],
        "minprice": 70, "maxprice": 120,
    },
    "ram2": {
        "name": "RAM SO-DIMM Crucial Value 8GB (1x8GB) DDR4-3200MHz CL22 Single-Ranked",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/p/r/product-p018521-64311_1_5.jpg"],
        "minprice": 50, "maxprice": 70,
    },
    "gpu": {
        "name": "XFX Radeon RX 6700 XT Speedster QICK 319 Black Gaming 12GB GDDR6",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/6/0/604f6d1a54e3b402f2783117_6700_xt_qick_319_box_mockup_100-p-1600.jpeg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/6/0/604f6d22553b7d668ccf81b3_6700_xt_qick_319_mockup_02-p-1600.jpeg"],
        "minprice": 700, "maxprice": 800,
    },
    "gpu2": {
        "name": "Gigabyte GeForce RTX 3080 Ti Gaming 12G GDDR6X OC",
        "files": ["https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/1/_/1_21_2.jpg", "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/7/_/7_10_7.jpg"],
        "minprice": 500, "maxprice": 700,
    },
    "book": {
        "name": "The Wedding Dress",
        "files": ["https://static.fnac-static.com/multimedia/Images/PT/NR/7f/6b/67/6777727/1540-1.jpg"],
        "minprice": 10, "maxprice": 25,
    },
    "book2": {
        "name": "Honest Illusions",
        "files": ["https://static.fnac-static.com/multimedia/Images/PT/NR/7d/6b/67/6777725/1540-1.jpg"],
        "minprice": 10, "maxprice": 25,
    },
    "book3": {
        "name": "Beautiful World, Where Are You",
        "files": ["https://static.fnac-static.com/multimedia/Images/PT/NR/53/76/6a/6977107/1540-1.jpg"],
        "minprice": 10, "maxprice": 25,
    },
    "book4": {
        "name": "Detransition, Baby : A Novel",
        "files": ["https://static.fnac-static.com/multimedia/Images/PT/NR/44/27/75/7677764/1540-1.jpg"],
        "minprice": 10, "maxprice": 25,
    },
    "tablet1": {
        "name": "Samsung Galaxy Tab A7",
        "files": ["https://c1.neweggimages.com/ProductImage/A24GD210714Y9VU0.jpg"],
        "minprice": 100, "maxprice": 200,
    },
    "tablet2": {
        "name": "Android 10, 8-inch Android Tablet",
        "files": ["https://c1.neweggimages.com/ProductImage/ARTPD21052862K2E.jpg"],
        "minprice": 70, "maxprice": 140,
    },
    "headphones1": {
        "name": "Beyerdynamic DT 1990 Pro",
        "files": ["https://c1.neweggimages.com/ProductImage/0TH-00JD-000R7-S08.jpg"],
        "minprice": 70, "maxprice": 140,
    },
    "headphones2": {
        "name": "Bose Soundlink Around-Ear Wireless",
        "files": ["https://c1.neweggimages.com/ProductImage/26-627-052-14.jpg"],
        "minprice": 70, "maxprice": 140,
    },
    "phone1": {
        "name": "Apple iPhone 13 Pro",
        "files": ["https://c1.neweggimages.com/ProductImage/AN2HS2109174jMfO.jpg"],
        "minprice": 1500, "maxprice": 1600,
    },
    "phone2": {
        "name": "Samsung Galaxy Note 20 Ultra 5G",
        "files": ["https://c1.neweggimages.com/ProductImage/26-627-052-14.jpg"],
        "minprice": 1300, "maxprice": 1500,
    },
}

for product in products:
    products[product]["description"] = products[product].get("description", "Empty.")
    products[product]["forSale"] = "true"
    products[product]["characteristic"] = products[product].get("characteristic", "[]")
    products[product]["tecnical"] = products[product].get("tecnical", "[]")
    products[product]["imagesToDelete"] = "[]"
    products[product]["score"] = "0"
    products[product]["number_scores"] = "0"
    products[product]["best_offer"] = "0"


def add_product(state, product):
    state.logger.info("Adding product '" + product["name"][:10] + "'.")
    url = state.baseurl + "/product"

    payload = {}
    for key in ["name", "description", "category_id", "forSale", "characteristic", "tecnical", "imagesToDelete", "score", "number_scores", "best_offer"]:
        payload[key] = product[key]
    files = []

    for i in range(len(product.get('files', []))):
        img = io.BytesIO(requests.get(product['files'][i]).content)
        files.append(('images', (str(i) + '.jpg', img, 'image/jpeg')))

    response = requests.request("POST", url, headers={}, data=payload, files=files)
    product["_id"] = response.json()["data"]["_id"]
