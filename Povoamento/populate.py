import os
import signal
import subprocess


s1 = subprocess.Popen(['mongoimport', '--db', 'retailmarketplace', '-c','categories', 'category.json', '--jsonArray', '--upsert','--drop'])
s2 = subprocess.Popen(['mongoimport', '--db', 'retailmarketplace', '-c','users', 'users.json', '--jsonArray', '--upsert','--drop'])
s3 = subprocess.Popen(['mongoimport', '--db', 'retailmarketplace', '-c','sellers', 'sellers.json', '--jsonArray', '--upsert','--drop'])
s4 = subprocess.Popen(['mongoimport', '--db', 'retailmarketplace', '-c','clients', 'clients.json', '--jsonArray', '--upsert','--drop'])
s5 = subprocess.Popen(['mongoimport', '--db', 'retailmarketplace', '-c','products', 'products.json', '--jsonArray', '--upsert','--drop'])
s6 = subprocess.Popen(['mongoimport', '--db', 'retailmarketplace', '-c','sellerComments', 'sellerComments.json', '--jsonArray', '--upsert','--drop'])
s7 = subprocess.Popen(['mongoimport', '--db', 'retailmarketplace', '-c','proposals', 'proposals.json', '--jsonArray', '--upsert','--drop'])



