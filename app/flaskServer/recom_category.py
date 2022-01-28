'''
Recomendar novas categorias tendo por base geoloclaização e google trends.

'''

import csv
import time
from datetime import datetime
from pytrends.request import TrendReq
import pandas as pd

country = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR",
"AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE",
"BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO",
"BN", "BG", "BF", "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD",
"CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI",
"HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG",
"SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF",
"PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD",
"GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN",
"HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT",
"JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG",
"LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK",
"MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT",
"MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA",
"NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP",
"NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN",
"PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN",
"LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC",
"SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES",
"LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ",
"TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV",
"UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN",
"VG", "VI", "WF", "EH", "YE", "ZM", "ZW"]


us_state_to_abbrev = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "District of Columbia": "DC",
    "American Samoa": "AS",
    "Guam": "GU",
    "Northern Mariana Islands": "MP",
    "Puerto Rico": "PR",
    "United States Minor Outlying Islands": "UM",
    "U.S. Virgin Islands": "VI",
}
    
# invert the dictionary
us_state = dict(map(reversed, us_state_to_abbrev.items()))


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
        return "[ERROR] get_interest_over_time"

    return trends



def write_to_csv(trends, geo,today):
        with open('datasets/categories_trends.csv', mode = 'a', encoding = "utf8") as csv_file:
            writer = csv.writer(csv_file, lineterminator='\n')

            trends_str = ''
            for i in trends:
                trends_str += i + ','
                
            #trends -1 para retirar a ultima virgula
            writer.writerow([today, geo, trends_str[:-1]])

            



def categories (geo):

    #geo = 'US'
    '''
    Verificar se a pesquisa já foi feita
    '''
    with open('datasets/categories_trends.csv', newline='') as csvfile:
        today = datetime.today().strftime('%Y-%m-%d')
        trends_list = []

        r = csvfile.readlines()
        for entry in r:
            print (entry)
            day, g, trends = entry.split(',',2)
            trends = trends[1:-3]

            if day == today and geo == g : 
                trends_list=trends.split(',')
                return trends_list
   

    listInterest = []
    categories = open("categories.txt","r")

    for c in categories:
       # print(c)
        c= c[:-1]   #Retirar o "/n"
        trends = get_interest_over_time (c, geo)
       
        if not trends.empty:
            r = trends[c][0] - trends[c][1]    
            listInterest.append ((c, r))

    l = sorted(listInterest, key=lambda x: x[1], reverse=True)
    print(l)
    trends_list = []

    for (cat,trend) in l[:4]:
        trends_list.append (cat)


    today = datetime.today().strftime('%Y-%m-%d')
    write_to_csv(trends_list, geo, today)

    
   
    return (trends_list)



    