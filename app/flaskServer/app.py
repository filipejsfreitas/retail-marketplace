# Executar py -m app run
from decimal import Context
from flask import Flask, request

from product_info import product_info
from update_dataset import update_dataset
from price_optimization import price_optimization
from Forecasting import forecasting
from recom_category import categories
from pytrends.request import TrendReq
from product_recomendation import getProductRecommendations, addOrder
from forecast_sales import forecast_sales_orders
             


# define the app
app = Flask(__name__)



'''
Metodo invocado sempre que é adicionado um novo comentario ao produto.
Cada comentario é classificado e adicionado ao dataset
'''
@app.route('/add_review_classify', methods=['POST'])
def add_review_classify():

    ##Recebe id do produto no pedido
    #productId = request.json['productId']
    #review = request.json['review']

    data =  request.get_json(force=True)

    #lê dados
    #data = pd.read_csv("datasets/reviews.csv", index_col=False,sep=',')
    try:
        update_dataset(data ["productId"], data ["review"])
    except:
        return False
    
    
    return "True"


'''
Metodo invocado para obter sentimentos e topicos de palavras mais usadas nos comentarios de um produto 
'''
@app.route('/product_evaluation/<productId>', methods=['GET'])
def product_evaluation(productId):  
    #lê dados
    payload = product_info(productId)
    
    return payload


'''
Sugestão de preço de um produto
'''
@app.route('/seller_optimization', methods=['POST'])
def seller_optimization():
    
    ## Esta função espera receber um vendedor, o id e nome do produto, e a lista de propostas para esse produto.

    data =  request.get_json(force=True)

    print(data)
 

    res = price_optimization(data)
    
    "retorna um objeto com o id do seller, do produto, da proposta e sugetsão de preço"
    return res



'''
Metodo invocado para obter lista de produtos recommendados 
'''
@app.route('/products_recommendation/<productId>', methods=['GET'])
def products_recomendation(productId):
    # Read recommendations for given product
    return {"recommendations": getProductRecommendations(productId)}



'''
Metodo invocado para o guardar novas orders, usadas para calcular recomendações
'''
@app.route('/add_order',  methods=['POST'])
def add_order():
    # Read incoming data
    data = request.get_json(force=True)

    # Get order 
    orderId, productIds, clientId = data["orderId"], data["productIds"], data["clientId"]

    # Add order to DataFrame
    try:
        addOrder(orderId, productIds, clientId)
    except:
        return "Something went wrong."
    
    return "Order added successfully."



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
@app.route('/forecast_stock/', methods=['POST'])

## Recebe a geolocalização
def forecast_stock(): 

    '''
    data = {
        "id":"99999999",
        "productName":"HP Deskotp"
    }
    '''
   
    data =  request.get_json(force=True)

    try:    
       fCast = forecasting(data["id"],data["productName"])
    except:
        None
    
    #print (fCast)
    return fCast


'''
retornar forecast do numero de vendas e valor ganho
'''
@app.route("/forecast" , methods=['POST'])
def forecast():
    data =  request.get_json(force=True)
    try:    
        fcast = forecast_sales_orders(data)
    except:
        return None

    return fcast



if __name__ == '__main__':
    # This is used when running locally.
    app.run(host='0.0.0.0', debug=True)

