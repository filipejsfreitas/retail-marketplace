
'''
Sempre que um comentario é adcionado a base de dados este ficheiro deve ser executado.
Recebe o id do produto (ou seller) e o comenatrio feito e vai classificar o comentario e adiciona-lo ao dataset de modo a que depois
quando executado o modeulo seller_info se tenha o dataset atualizado
'''


import spacy
import pandas as pd

from nrclex import NRCLex
import nltk
nltk.download('punkt')


nlp = spacy.load('en_core_web_md')


# Função que faz lematização, tokenização, retira pontuação e stop words, coloca o texto em minusculas

def dataPrep(review):
    doc = nlp(review)  
    res = " ".join([token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct])   
    return res


## Função que utiliza o NRClex para dar uma lista de sentimentos associados a uma review

def sentimentAnalysis(review):
  review = NRCLex(review)    
  return dict(sorted(review.affect_frequencies.items(), key=lambda item: item[1], reverse=True))  ## ordenar resultado


def main(id_product, review):
    
    res = dataPrep(review)

    emotions = sentimentAnalysis(res)

    
    ## ler o dataset com os comentarios
    data = pd.read_csv("reviews.csv")
    for x in emotions:
        row = {'id': id_product, "review": review, "classification": x}
        break

    # Adicionar a nova linha ao dataset
    data = data.append(row,  ignore_index=True)

     #Retirar colunaas que estão a mais
    data = data[['id','review','classification']]
    


    data.to_csv("reviews.csv")


if __name__ == "__main__":
    id = "12345"
    review = "bad product"
    main(id,review)

    

