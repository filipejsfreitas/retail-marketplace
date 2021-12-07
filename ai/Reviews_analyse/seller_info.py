from nltk.tokenize import RegexpTokenizer
from nltk import FreqDist
import seaborn as sns
import pandas as pd
import numpy as np

from textblob import TextBlob, sentiments
from sklearn.feature_extraction.text import CountVectorizer


'''
Este ficheiro deve permite ao seller saber para cada seu produto, o que é mais criticado/elogiado pelos users e as principais emoções idetificadas.

'''



def Bag_Of_Words(ListWords):
    all_words = []
    for m in ListWords:
        for w in m:
            all_words.append(w.lower())
    all_words1 = FreqDist(all_words)
    return all_words1


def top_n_words(language, corpus,n = None,ngram = 1):

    # Contar o número de todas as palavras  nas reviews
    vec = CountVectorizer(stop_words = language,ngram_range=(ngram,ngram)).fit(corpus)
    
    bag_of_words = vec.transform(corpus) 

    sum_words = bag_of_words.sum(axis =0) 
    words_freq = [(word,sum_words[0,idx]) for word,idx in vec.vocabulary_.items()]
    
    words_freq = sorted(words_freq,key = lambda x:x[1],reverse = True)
    
    return words_freq[:n]


def RegExpTokenizer(Sent):
    tokenizer = RegexpTokenizer(r'\w+')
    return tokenizer.tokenize(Sent)



def read_dataset():  

    data = pd.read_csv('reviews.csv', index_col=False,sep=',')

    return data


def top_words_Product_reviews(language, product, n=10, words = 2):
    common_words = top_n_words(language, [text for text in product['review']], n,words)
    return (common_words)


def identify_words(common_words):


    # from https://medium.com/life-at-hopper/conducting-sentiment-analysis-on-app-reviews-to-inform-product-decisions-64fcc71822ed with wordcloud
    list_words =  ['perfect', 'loved', 'expensive', 'dislike','good','decent', 'great', 'predominantly', 'reasonable', 'nice', 
    'cheap','flimsy', 'chinsey', 'cheaply', 'fragile', 'mealso','junk','crap', 'garbage', 'upset', 'fake', 'trash',
    'bad','terrible', 'horrible', 'wrost', 'hight','great','fantastic', 'excellent', 'good', 'awesome', 'terrific',
    'price','cost', 'like', 'love','awesome', 'easy', 'pretty','recommend','amazing', 'awesome','favorite', 'nice', 'cool','variety',
    'crash', 'hate','late','best','helpful','works','useful', 'well','excellent', 'wast', 'error','useless', 'trust','right']

    words = []
    for c,v in common_words:

        if c in list_words:
           words.append(c)

    return(words)


def give_sentiment_product (product):
    sentiments = dict(product['classification'].value_counts())
    return ((list(sentiments.keys())))

def main(idProduct,  language, data):

    if language == "english":
        
        product = data[(data['id']==idProduct)]

        ## Identificar as palavras mais utilizadas
        common_words = top_words_Product_reviews (language, product, 10, 1)

       # print(common_words)
        ## Identificar as palavras que nos importa usar
    
        words = identify_words(common_words)

        sentiments = give_sentiment_product (product)

        print("O produto " + idProduct + " despertou as seguintes emoções aos utilizadores: " + sentiments[0] + ", " + sentiments[1] )
        print("As principais palavras utilizadas para descrever o produto " + idProduct + " são: " + ' , '.join(words) )
    

if __name__ == "__main__":
    #   id_product = "AVpgfP3DilAPnD_xtG3M"

    id_product = "AVsRhL-fQMlgsOJE6zvB"
    language = "english"   ## 'english' or "portuguese"
   
    data = pd.read_csv("reviews.csv", index_col=False,sep=',')

   
    main(id_product, language, data)