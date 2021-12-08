from numpy import product
from numpy.core.fromnumeric import prod
from numpy.lib.function_base import median
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

    results = {} ## Associa a cada produto o preço antigo e novo

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

def main(id_seller):
     
   
    '''
    PARA TESTAR ESTA-SE A USAR OS DADOS DO FICHEIRO dados_proposal.json
    
    ********** AO JUNTAR AO BACKEND::*******************

    Query a base de dados para ir buscar todas as propostas do vendedor (id_seller)

    Para cada proposta do id_seller, pegar no id_produto associado e fazer query para ir buscar todas as propostas com esse id
    Guardar o preço associado a cada proposta (list_price)
    '''
    
     
    # Opening JSON file created just for testing. 
    # Na conexão com o backend substituir isto por pedidos a API
    f = open('dados_proposal.json')
    data = json.load(f)


    ## id dos produtos vendidos pelo seller id_seller
    seller_products = [proposal['id_product'] for proposal in data['proposals'] if proposal['id_seller']==id_seller]

    res = {} ## Vai guardar para cada proposta o id o preço recomendado

    for id_product in seller_products:

        #Id proposta
        proposal_id = [proposal['id'] for proposal in data['proposals'] if proposal['id_seller']==id_seller and proposal['id_product']==id_product][0]

        #Preço proposta
        price_proposal = [proposal['price'] for proposal in data['proposals'] if proposal['id_seller']==id_seller and proposal['id_product']==id_product][0]

        # Nome do produto
        nameProduct = [product['name'] for product in data['products'] if product['id'] == id_product][0]
        
        #Lista com preços de outras propostas para o mesmo produto
        prices_product = [proposal['price'] for proposal in data['proposals'] if proposal['id_product']==id_product]
        
       
       # print(id_seller, prices_product,price_proposal , nameProduct)

        trend = get_interest_over_time(nameProduct)
        print(trend)
        
         ## preço obtido ao consultar a tendencia de procuras no google trends
        price_trends = analyse_trends(trend, price_proposal)

        ## susgestão de preço por fazer a mediana de todos os preços das propostas de um produto (que constam na nossa base de dados)
        price_apiData = analyse_api_data(prices_product)

        print(price_trends , price_apiData)

        #O preço a sugerir será a ponderação entre os dois preços previamente identificados.
        #Atribuiço maior ponderação ao preço obtido. Isto para evitar que o seller nao tenha um preço muito distante das restantes ofertas

        print("We suggest: " , 0.4 * price_trends + 0.6* price_apiData, nameProduct)

        #Guarda a sugestão de preço associada ao id da proposta
        res[proposal_id] = 0.4 * price_trends + 0.6* price_apiData

    return res
        
    

if __name__ == "__main__":
    
    #Recebe o id do vendedor
    id_seller = 1
    main(id_seller)