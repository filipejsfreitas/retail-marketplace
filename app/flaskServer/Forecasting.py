# Biblotecas Principais
from pytrends.request import TrendReq
import statistics
import pandas as pd
import statsmodels.api as sm
import math




def forecast (productName):

    # Escolher Produtos para ver número de clicks nessa semana
    pytrends = TrendReq(hl='en-US')

    #Interesse num determinado produto
    pytrends.build_payload(kw_list=[productName], geo='US')
    interesseCategoria = pytrends.interest_over_time()

   # print(interesseCategoria)
   # print(type(interesseCategoria))

    interesseCategoria = interesseCategoria.drop(columns=['isPartial'], axis=1)



    mod = sm.tsa.statespace.SARIMAX(interesseCategoria,
                                    order=(1, 1, 1),
                                    seasonal_order=(1, 1, 1, 12),
                                    enforce_stationarity=False,
                                    enforce_invertibility=False)
    results = mod.fit()
   # print(results.summary().tables[1])


    pred_uc = results.get_forecast(steps=12)

    previsao = pred_uc.predicted_mean
    #print (previsao)

    prevision = [round(p) for p in previsao.to_list()]
    #print(previsao)

    data = {"prevision" : prevision}

    mediaPrevisao = statistics.mean(previsao) 
    #print(mediaPrevisao)

    return data