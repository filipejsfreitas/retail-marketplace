import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pandas as pd
from flask import jsonify
import numpy as np
import requests
import json

sentiment = ['Positive', 'Negative', 'Neutral']

tensorflow_server = 'http://localhost:9000'

'''
Preprocess a text in order to pass it to the sentiment analysis model
'''
def preprocess_input(text):
    df = pd.read_csv('data_train.txt', sep='\n')
    data_train = df['juntao irmao'].values.tolist()
    data_train.append('juntao irmao')

    #convert list to ndarray of 1D
    data_train = np.array(data_train)  

    tokenizer = Tokenizer(num_words = 5000)

    tokenizer.fit_on_texts(data_train)
    sequence = tokenizer.texts_to_sequences([text])
    test = pad_sequences(sequence, maxlen = 200)
    
    # Creating payload for TensorFlow serving request
    payload = {
        "instances": [test.tolist()[0]]
    }
    
    return payload
    
def get_prediction(payload):
    r = requests.post(tensorflow_server + '/v1/models/sa_model:predict', json = payload)

    # Decoding results from TensorFlow Serving server
    pred = json.loads(r.content.decode('utf-8'))
    print(pred)
    # Returning JSON response to the frontend
    sent = np.around(pred['predictions'], decimals = 0).argmax(axis = 1)[0]
        
    # print(sentiment[sent], type(sentiment[sent]))
    return jsonify(sentiment[sent])

