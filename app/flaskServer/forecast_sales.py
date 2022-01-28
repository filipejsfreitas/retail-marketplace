
from itertools import count
import statsmodels.api as sm
from pandas.tseries.offsets import DateOffset
import pandas as pd
import json


def sarimaxModel (data, length, value):

    model=sm.tsa.statespace.SARIMAX(data[value],order=(1, 1, 1),seasonal_order=(1,1,1,19))
    results=model.fit()
    return (results.predict(start=length ,end=length ,dynamic=True))



def forecast_sales_orders (data):

    sales = []
    time = []
    count = []

  

    for i in range(len(data)):
      
        sales.append (data[i]["totals"]["lastXDays"])
        time.append (data[i]["period"]["end"])
        count.append (data[i]["counts"]["lastXDays"])

    sales.reverse()
    time.reverse()
    count.reverse()

    
    df = pd.DataFrame(list(zip(time, sales, count)),columns=['week','sales', "orders"])
    
    df.to_csv ("datasets/sales.csv")
    df['week']= pd.to_datetime(df['week'])
    print (df)
    
    try:
        totals = sarimaxModel (df, len(time), "sales")
    
        counts = sarimaxModel (df, len(time), "orders")
     
        print (totals)
        print (counts)

        print(df["week"][df.index[-1]])
    
    except:
        return {"time": time, "sales": None, "orders":None}

    return {"time": df["week"][df.index[-1]]+ DateOffset(weeks=1) , "sales": [int(i) for i in totals.tolist()][0], "orders": [int(i) for i in counts.tolist()][0]}
    

