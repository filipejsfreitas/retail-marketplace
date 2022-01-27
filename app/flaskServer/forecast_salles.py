
from itertools import count
import statsmodels.api as sm


def sarimaxModel (data, length):

    model=sm.tsa.statespace.SARIMAX(data['Sales'],order=(1, 1, 1),seasonal_order=(1,1,1,length))
    results=model.fit()
    return (results.predict(start=length + 1 ,end=length + 1 + 1,dynamic=True))



def forecast_salles_orders (data):
    salles = []
    time = []
    count = []

    for i in data:
        salles.append (data[i]["totals"]["totalLastXDays"])
        time.append (data[i]["periodicChanges"]["previousXDays"])
        count.append (data[i]["counts"]["countLastXDays"])

    salles.reverse()
    time.reverse()
    count.reverse()

    totals = sarimaxModel (salles, len(time))
    counts = sarimaxModel (count, len(time))

    return {"time": time, "salles": totals, "orders":totals}
    

