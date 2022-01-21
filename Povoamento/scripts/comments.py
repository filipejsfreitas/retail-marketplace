## Imports necessarios
import json
import random
from xmlrpc import client

########################################## READ CLIENTS ID ##########################################
f = open("clients.json","r")
data = f.read()
clients = json.loads(data)


## lista onde serão guardados os ids a distribuir 
id_client = []

for i in range(len(clients)):
    id_client.append (clients[i]['_id'])





########################################## READ SELLERS ID ##########################################

f = open("sellers.json","r")
data = f.read()
sellers = json.loads(data)


## lista onde serão guardados os ids a distribuir 
id_seller = []

for i in range(len(sellers)):
    id_seller.append (sellers[i]['_id'])




#Abrir o product.json
f = open("sellerComment.json","r")
data = f.read()
comment = json.loads(data)


print(len(id_client), len(id_seller))


for i in range(len(comment)):
    comment[i]["client_id"] = random.choice(id_client)
    comment[i]["seller_id"] = random.choice(id_seller)

with open("sellerComments.json", 'w') as f:
    json.dump(comment, f, indent=1)


