import math
import pandas as pd

clientes = pd.read_csv('cliente.csv')
produtos = pd.read_csv('produtos.csv')

def getMoradaEProdutos(idCliente):
    return list(clientes[clientes['idCliente']== idCliente]['morada'])[0], list(clientes[clientes['idCliente']== idCliente]['listaP'])


def getIDCategoriaNumVisPontuacaoNumPontuacoes (idProduto):
    return list(produtos[produtos['idProduto']== idProduto]['categoria']) , list(produtos[produtos['idProduto']== idProduto]['NumVisualizacoes']) , 
    list(produtos[produtos['idProduto']== idProduto]['Pontuacao']), list(produtos[produtos['idProduto']== idProduto]['NumPontuacoes'])

def getIDCategoria(idProduto):
    return list(set(list(produtos[produtos['idProduto'] == idProduto]['categoria'])))

def getIDCatNumVisPontuacaoNumPontuacoesNumVezes(listaPVistos):
    for idProd in listaPVistos:
        num_vezes= listaPVistos.count(idProd)
        return list(produtos[produtos['idProduto']== idProd]['categoria']) , list(produtos[produtos['idProduto']== idProd]['NumVisualizacoes']) ,
        list(produtos[produtos['idProduto']== idProd]['Pontuacao']) , list(produtos[produtos['idProduto']== idProd]['NumPontuacoes']), num_vezes

def getProduto(categoria):
    return list(produtos[produtos['categoria'] == categoria]['idProduto'])


def calculoRecomenda(idProduto, idCliente):
    categorias, NumVis, Pontuacao, NumPontuacoes = getIDCategoriaNumVisPontuacaoNumPontuacoes(idProduto)
    saldoProd = (sum(NumPontuacoes) * sum(Pontuacao)) / sum(NumVis)
    
    listaProdutosComum = list(set([getProduto(categoria) for categoria in categorias]))
    listaProdutosComum.remove(idProduto)

    listaIDProd = getProduto(dfprodutos, ID)
    morada, prodVistos = getMoradaEProdutos(idCliente)
    #cp = getCodigoPostal(morada[0])
    listaIDCats, listaNumVis, listaPontuacoes, listaNumPontuacoes, num_vezes = getIDCatNumVisPontuacaoNumPontuacoesNumVezes(prodVistos)
    
    listaProdSaldo = []
    for idProd in listaIDProd:
        saldo = 1
        idCatTemp, NumVisTemp, PontuacaoTemp, NumPontuacoesTemp = getIDCategoriaNumVisPontuacaoNumPontuacoes(idProd)
        if idCatTemp[0] == IDCat[0]:
            saldo *= 2
        elif idCatTemp[0] == IDCatAcima[0]:
            saldo *= 1.5
        elif idCatTemp[0] in listaIDCats:
            saldo *= 1.2
        saldoProdTemp = (sum(NumPontuacoesTemp) * sum(PontuacaoTemp)) / sum(NumVisTemp)
        if math.abs(saldoProdTemp - SaldoProd) <= VALOR_TEMP :
            saldo *= 2
        if idProd in prodVistos :
            saldo *= 5
        listaProdSaldo.append((idProd, saldo*2))
    
    listaIDProdCatAcima = getProduto(dfprodutos, IDCatAcima)
    for idProd in listaIDProd:
        saldo = 1
        idCatTemp, NumVisTemp, PontuacaoTemp, NumPontuacoesTemp = getIDCategoriaNumVisPontuacaoNumPontuacoes(idProd)
        if idCatTemp[0] == IDCat[0]:
            saldo *= 2
        elif idCatTemp[0] == IDCatAcima[0]:
            saldo *= 1.5
        elif idCatTemp[0] in listaIDCats:
            saldo *= 1.2
        saldoProdTemp = (sum(NumPontuacoesTemp) * sum(PontuacaoTemp)) / sum(NumVisTemp)
        if math.abs(saldoProdTemp - SaldoProd) <= VALOR_TEMP :
            saldo *= 2
        if idProd in prodVistos :
            saldo *= 5
        listaProdSaldo.append((idProd, saldo*1.5))
    
    return listaProdSaldo
#confirmar com o pessoal de AI se querem usar mais coisas para as contas