from numpy import product
from numpy.core.fromnumeric import prod
from pytrends.request import TrendReq
import pandas as pd
import matplotlib
import csv
import time
from datetime import datetime




## Variação do interesse nos produtos 
def get_interest_over_time(list_product):
    
    try:
        pytrends = TrendReq(hl='en-US',   geo='US' )
        
        pytrends.build_payload(kw_list=list_product)
        df = pytrends.interest_over_time()
        
        ## Manter apenas os resultados das duas ultimas semanas
        trends = df.iloc[-2:]
    except:
        print ("[ERROR] get_interest_over_time")

    return trends


def PriceOptimizer (flag, range, product,products_price):

    # se se verificou aumento na demanda
  
    new_price = - (range/100 * products_price[product] ) + products_price[product]

    return new_price




## Identificar se a procura aumentou ou diminuiu
def  analyse_trends(trends, products_price):

    results = {} ## Associa a cada produto o preço antigo e novo

    for product in trends:
        print('-------------------------------------------------')

        if product != 'isPartial':

            range = trends[product][0] - trends[product][1]
            
            if trends[product][0] < trends[product][1]:
                print('[' + product + ']' + "There was an increase in demand for this product")
                new_price = PriceOptimizer (0, range, product, products_price)
                message = "Should consider increasing " + product + " stock. And update the price. We suggest, " + str(new_price)
                results[product] = [ products_price[product], new_price]
                print(message)

                
           
            else:
                print('[' + product + ']' + "There was a decrease in demand for this product.")
                new_price = PriceOptimizer (1, range, product, products_price)
                message =  "Pay attention. The " + product + " is in low demand. You must not increase your stock. Maybe offering a discount is a good option. We suggest , " +  str(new_price)
                results[product] = [ products_price[product], new_price]
                print(message)

    return results

def main():
    '''
    NOTA DE IMPLEMNETAÇÃO:

    Deverá existir uma query que vai buscar todos os produtos (nome) do vendedor e respetivo preço. 
    Para efeitos de teste o resultado dessa query esta no products_price ()
    '''
    products_price = {'fridge' : 10 ,'coffee machine':20, 'christmas tree': 20}
    list_products = []

    for p in products_price:
        list_products.append(p)  


    trends = get_interest_over_time(list_products)
    print(trends)

    results = analyse_trends(trends, products_price)
    print(results)

if __name__ == "__main__":
    main()