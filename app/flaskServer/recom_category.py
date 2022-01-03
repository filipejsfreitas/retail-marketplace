'''
Recomendar novas categorias tendo por base geoloclaização e google trends.

'''

from pytrends.request import TrendReq
import statistics

import json


## Variação do interesse nos produtos 
def get_interest_over_time(c, g):
    
    
    try:
        pytrends = TrendReq(hl='en-US',  geo=g)
        
        pytrends.build_payload(kw_list=[c])
        df = pytrends.interest_over_time()
        
        ## Manter apenas os resultados das duas ultimas semanas
        trends = df.iloc[-2:]
    except:
        print ("[ERROR] get_interest_over_time")

    return trends



def categories (geo):
    geo = 'US'
    listInterest = {}
    categories = open("categories.txt","r")

    for c in categories:
        trends = get_interest_over_time (c, geo)
        range = trends[c][0] - trends[c][1]    
        listInterest[c] = range


    print (listInterest)
    