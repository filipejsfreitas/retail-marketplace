# Executar py -m app run
from decimal import Context
from flask import Flask, request

from product_info import product_info
from update_dataset import update_dataset
from price_optimization import price_optimization
from product_recomendation import calculoRecomenda
from Forecasting import forecast
from recom_category import categories
from pytrends.request import TrendReq
import pandas as pd
import numpy as np                        


# define the app
app = Flask(__name__)



'''
Metodo invocado sempre que é adicionado um novo comentario ao produto.
Cada comentario é classificado e adicionado ao dataset
'''
@app.route('/add_review_classify', methods=['GET', 'POST'])
def add_review_classify():

    ##Recebe id do produto no pedido
    #productId = request.json['productId']
    #review = request.json['review']

    data = {"productId" : "AVpf3txeLJeJML43FN82"
    ,"review" : "The computer works very well."}

    #lê dados
    #data = pd.read_csv("datasets/reviews.csv", index_col=False,sep=',')

    update_dataset(data ["productId"], data ["review"])
    
    return "True"




'''
Metodo invocado para obter sentimentos e topicos de palavras mais usadas nos comentarios de um produto 
'''
@app.route('/product_evaluation/<productId>', methods=['GET', 'POST'])
def product_evaluation(productId):  
    #lê dados
    payload = product_info(productId)
    
    return payload


'''
Sugestão de preço de um produto
'''
@app.route('/seller_optimization', methods=['GET', 'POST'])
def seller_optimization():
    
    ## Esta função espera receber um vendedor, o id e nome do produto, e a lista de propostas para esse produto.
    
    data = {
    "sellerID": 1,
    "productId" : 10, 
    "product_name": "panasonic tv",
    "proposals": [{
        "id": 0,
        "sellerId": 3,
        "productId": 10,
        "price": 300,
        "shipping_price": 6,
        "stock": 8
      },
      {
        "id": 10,
        "sellerId": 1,
        "productId": 10,
        "price": 346,
        "shipping_price": 7,
        "stock": 9
      },
      {
        "id": 10,
        "sellerId": 4,
        "productId": 10,
        "price": 310,
        "shipping_price": 3,
        "stock": 9
      }]
      
      
  }

    res = price_optimization( data)
    
    "retorna um objeto com o id do seller, do produto, da proposta e sugetsão de preço"
    return res



'''
Metodo invocado para obter lista de produtos recommendados 
'''
@app.route('/products_recomendation/<clientId>/<productId>', methods=['GET'])
def products_recomendation(clientId, productId): 

    print (clientId, productId) 
    #lê dados
    payload = calculoRecomenda(productId, clientId)
    
    return payload


'''
Metodo invocado para obter lista de categorias recomendadas ao seller com base na geolocalização e trends
'''
@app.route('/search_categories/<geo>', methods=['GET'])

## Recebe a geolocalização
def new_categories(geo): 
   
    #lê dados
    trends_list = categories(geo)
    context = {
            "categories": trends_list
        }

    return context


'''
Obter forecasting stock
'''
@app.route('/forecast_stock/<productName>', methods=['GET'])

## Recebe a geolocalização
def forecast_stock(productName): 
    print (productName)
   
    fCast = forecast(productName)
    #print (fCast)
    return fCast


if __name__ == '__main__':
    # This is used when running locally.
    app.run(host='0.0.0.0', debug=True)

