
import statsmodels.api as sm


def sarimaxModel (data, startPrediction):

    model=sm.tsa.statespace.SARIMAX(data['Sales'],order=(1, 1, 1),seasonal_order=(1,1,1,12))
    results=model.fit()
    return (results.predict(start=startPrediction,end=startPrediction + 1,dynamic=True))



def forecast_salles (data):
    
    return sarimaxModel (data, startPrediction)

