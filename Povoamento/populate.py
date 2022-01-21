import os
import signal
import subprocess


s1 = subprocess.Popen(['mongoimport', '--db', 'retailMarketplace', '-c','categorie', 'category.json', '--jsonArray', '--upsert','--drop'])
s2 = subprocess.Popen(['mongoimport', '--db', 'retailMarketplace', '-c','user', 'users.json', '--jsonArray', '--upsert','--drop'])
s3 = subprocess.Popen(['mongoimport', '--db', 'retailMarketplace', '-c','seller', 'sellers.json', '--jsonArray', '--upsert','--drop'])
s4 = subprocess.Popen(['mongoimport', '--db', 'retailMarketplace', '-c','client', 'clients.json', '--jsonArray', '--upsert','--drop'])
s5 = subprocess.Popen(['mongoimport', '--db', 'retailMarketplace', '-c','product', 'products.json', '--jsonArray', '--upsert','--drop'])
s6 = subprocess.Popen(['mongoimport', '--db', 'retailMarketplace', '-c','sellerComment', 'sellerComments.json', '--jsonArray', '--upsert','--drop'])
s7 = subprocess.Popen(['mongoimport', '--db', 'retailMarketplace', '-c','proposal', 'proposals.json', '--jsonArray', '--upsert','--drop'])



