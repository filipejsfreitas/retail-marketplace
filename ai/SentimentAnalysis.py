import os
import pandas as pd
import numpy as np
import random
import re
import nltk 
from sklearn.model_selection import train_test_split
import sys
import gensim

from nltk import tokenize
from nltk.tokenize.treebank import TreebankWordDetokenizer

import matplotlib.pyplot as plt

import tensorflow as tf

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn import metrics
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix
from gensim.models import word2vec
from tensorflow.keras.layers import Input,Conv1D,MaxPooling1D,Dense,GlobalMaxPooling1D,Embedding,Concatenate
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Activation,Dropout, Flatten, Dense, Input
from tensorflow.keras.models import load_model, Model, Sequential


import tensorflow as tf

from tensorflow.keras.models import Sequential
from tensorflow.keras import layers
from tensorflow.keras import regularizers
from tensorflow.keras import backend as K
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
# Global Variables ----------------
max_words = 5000
max_len = 200
#-----------------------------------



"""
# Função que faz lematização, tokenização, retira pontuação e stop words, coloca o texto em minusculas

"""
def dataPrep(review):
    doc = nlp(review)  
    #juntar os tokens obtidos na lematização numa só frase 
    #(token.pos_ == 'ADJ' or token.pos_ == 'VERB')
    res = " ".join([token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct])   
    return res

  



def read_dataset():  

    # predictor
    X_col = 'tweet'
    # classifier
    y_col = 'classification'

    """## FASE 1 - Análise e Preparação dos dados
    ### Load dataset
    """

    train_ds = pd.read_csv('/var/www/apps/Bombedia/Datasets/dataset_balanceado.csv', index_col=False,sep=',')

    # update classifiers to nominal value

    tweet = train_ds.loc[:, "tweet"].values
    classification = train_ds.loc[:, "classification"].values

    return tweet, classification, train_ds



def get_sets(tweet, classification):

    labels_train = np.array(classification)
    y = []

    #??????????????????
    for i in range(len(labels_train)):
        if labels_train[i] == 'Neutral':
            y.append(0)
        if labels_train[i] == 'Negative':
            y.append(1)
        if labels_train[i] == 'Positive':
            y.append(2)
    y = np.array(y)
    labels_train = tf.keras.utils.to_categorical(y, 3, dtype="float32")


    data_train = []
    data_test = []
    for i in range(len(tweet)):
        data_train.append(detokenize(tweet[i]))


    #array containing the tweets for train
    data_train = np.array(data_train)

    #write data train to file in order to open this processed data in the evaluation tool to fit on text
    with open('data_train.txt', 'w', encoding = 'utf-8') as f:
        np.savetxt(f, data_train, fmt = '%s')



    tokenizer = Tokenizer(num_words = max_words)
    tokenizer.fit_on_texts(data_train)
    #This class allows to vectorize a text corpus, by turning each text into either a sequence of integers (each integer being the index of a token in a dictionary) 
    sequences = tokenizer.texts_to_sequences(data_train) 
    tweets_train = pad_sequences(sequences, maxlen = max_len)


    x_train, x_test, y_train, y_test = train_test_split(tweets_train, labels_train, test_size=0.20, random_state=42)

    return x_train, x_test, y_train, y_test

"""#### Definir o modelo


NOTA: EM BAIXO É  POSSIVEL CARREGAR O MODELO PREVIAMENTE TREINADO
"""

def train_model(x_train, y_train, x_test, y_test):


    model = Sequential()
    model.add(layers.Embedding(max_words, 40, input_length = max_len))
    model.add(layers.Bidirectional(layers.GRU(20, dropout = 0.6)))
    model.add(layers.Dense(3, activation = 'softmax'))
    model.compile(optimizer = 'rmsprop', loss = 'categorical_crossentropy', metrics = ['accuracy'])

    es = EarlyStopping(monitor = 'loss', patience = 5)

    """### Treinar o modelo"""

    history = model.fit(x_train, y_train, epochs = 30, batch_size = 1, validation_data = (x_test, y_test), callbacks = [es], steps_per_epoch = 250)

    model.save('Models/ltsm/0000123')



def main():
    
    tweets, classification, train_ds = read_dataset()

    tweets = process_tweets(tweets)

    x_train, x_test, y_train, y_test = get_sets(tweets, classification)

    train_model(x_train, y_train, x_test, y_test)


if __name__ == "__main__":
    main()