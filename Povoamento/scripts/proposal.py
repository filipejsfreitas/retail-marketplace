## Imports necessarios
import json
import random
from xmlrpc import client

########################################## READ Products ID ##########################################
f = open("products.json","r")
data = f.read()
products = json.loads(data)


## lista onde serão guardados os ids a distribuir 
id_product= []

for i in range(len(products)):
    id_product.append (products[i]['_id'])





########################################## READ SELLERS ID ##########################################

f = open("sellers.json","r")
data = f.read()
sellers = json.loads(data)


## lista onde serão guardados os ids a distribuir 
id_seller = []

for i in range(len(sellers)):
    id_seller.append (sellers[i]['userId'])




#Abrir o product.json
f = open("proposals.json","r")
data = f.read()
proposals = json.loads(data)


print(len(id_product), len(id_seller))


for i in range(len(proposals)):
    proposals[i]["product_id"] = random.choice(id_product)
    proposals[i]["seller_id"] = random.choice(id_seller)

with open("proposals.json", 'w') as f:
    json.dump(proposals, f, indent=1)


