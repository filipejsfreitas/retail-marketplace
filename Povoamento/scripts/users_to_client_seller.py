''''
Ler os ids do user para puder atribuir um a cada client e seller

'''

## Imports necessarios
import json



## Abrir o users
f = open("users.json","r")
data = f.read()
users = json.loads(data)


## lista onde serão guardados os ids a distribuir 
ids = []

for i in range(len(users)):
    ids.append (users[i]['_id'])


#Abrir o client.json
f = open("client.json","r")
data = f.read()
clients = json.loads(data)

for i in range(len(clients)):
    clients[i]["userId"] = ids[i]

with open("clients.json", 'w') as f:
    json.dump(clients, f, indent=1)




#Abrir o seller.json
f = open("seller.json","r")
data = f.read()
sellers = json.loads(data)

for i in range(len(sellers)):
    sellers[i]["userId"] = ids[i + 860]

with open("sellers.json", 'w') as f:
    json.dump(sellers, f, indent=1)

