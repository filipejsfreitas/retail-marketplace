from pytrends.request import TrendReq
import statistics

import json





## Variação do interesse nos produtos 
def get_interest_over_time(product):
    
    try:
        pytrends = TrendReq(hl='en-US',   geo='US' )
        
        pytrends.build_payload(kw_list=[product])
        df = pytrends.interest_over_time()
        
        ## Manter apenas os resultados das duas ultimas semanas
        trends = df.iloc[-2:]
    except:
        print ("[ERROR] get_interest_over_time")

    return trends


'''
Funçao que calcula o novo preço do produto tendo em conta o intervalo de variação que a pesquisa de um produto sofreu nas ultimas duas semana
'''
def PriceOptimizer ( range,price_proposal):

    new_price = - (range/100 * price_proposal ) + price_proposal

    return new_price




## Identificar se a procura aumentou ou diminuiu
def  analyse_trends(trends,price_proposal):

    for product in trends:
       

        if product != 'isPartial':

            range = trends[product][0] - trends[product][1]
            
            if trends[product][0] < trends[product][1]:
                #There was an increase in demand for this product
                new_price = PriceOptimizer (range, price_proposal)
                
            else:
                 #low demand
                print("porp",price_proposal)
                new_price = PriceOptimizer ( range, price_proposal)

    return new_price



'''
Esta função recebe uma lista com preços de uma proposta e calcula a mediana dessa preços
'''

def analyse_api_data (diferents_prices_product):

    median = statistics.median(diferents_prices_product)
    return median

def price_optimization(data):

 
#    f = open('datasets/dados_proposal.json')
 #   data = json.load(f)

    
    id_seller = data["sellerID"]
    id_product = data["productId"]
        

    #Id proposta
    proposal_id = [proposal['id'] for proposal in data['proposals'] if proposal['sellerId']==id_seller and proposal['productId']==id_product][0]

    #Preço proposta
    price_proposal = [proposal['price'] for proposal in data['proposals'] if proposal['sellerId']==id_seller and proposal['productId']==id_product][0]

    
        #Lista com preços de outras propostas para o mesmo produto
    prices_product = [proposal['price'] for proposal in data['proposals'] if proposal['productId']==id_product]
        
       
       # print(id_seller, prices_product,price_proposal , nameProduct)

    trend = get_interest_over_time(data["product_name"])

    print("ola")
    print(trend)
    
    ## preço obtido ao consultar a tendencia de procuras no google trends
    price_trends = analyse_trends(trend, price_proposal)

    ## susgestão de preço por fazer a mediana de todos os preços das propostas de um produto (que constam na nossa base de dados)
    price_apiData = analyse_api_data(prices_product)

    print(price_trends , price_apiData)

    #O preço a sugerir será a ponderação entre os dois preços previamente identificados.
    #Atribuiço maior ponderação ao preço obtido. Isto para evitar que o seller nao tenha um preço muito distante das restantes ofertas

   # print("We suggest: " , 0.4 * price_trends + 0.6* price_apiData, nameProduct)

    #Guarda a sugestão de preço associada ao id da proposta
    context = {
        "sellerId": id_seller,
        "productId": id_product,
        "proposalId":proposal_id,
        "priceSugestion": 0.4 * price_trends + 0.6* price_apiData
    }
    print (context)
    return context
        
    
