import math
import pandas as pd


#df = pd.read_csv('ficheiro')


def getMoradaEProdutos(idCliente):
    return list(df[df['idCliente']== idCliente]['morada']), list(df[df['idCliente']== idCliente]['listaP'])


def getIDCategoriaNumVisPontuacaoNumPontuacoes (idProduto):
    return list(df[df['idProduto']== idProduto]['idCategoria']) , list(df[df['idProduto']== idProduto]['NumVisualizacoes']) , list(df[df['idProduto']== idProduto]['Pontuacao']) ,list(df[df['idProduto']== idProduto]['NumPontuacoes'])

def getIDCategoriaAcimaNivel(idCategoria):
    return list(df[df['idCategoria']== idCategoria]['id']) , list(df[df['idCategoria']== idCategoria]['idCategoriaAcima']) , list(df[df['idCategoria']== idCategoria]['Nivel'])


def getCodigoPostal(morada):
    return list(df[df['morada']== morada]['cp'])


def getIDCatNumVisPontuacaoNumPontuacoesNumVezes(listaPVistos):
    listaIDs = [i[0] for i in listaPVistos]
    for idProd in listaIDs:
        num_vezes= listaIDs.count(idProd)
        return list(df[df['idProduto']== idProd]['idCategoria']) , list(df[df['idProduto']== idProd]['NumVisualizacoes']) , list(df[df['idProduto']== idProd]['Pontuacao']) , list(df[df['idProduto']== idProd]['NumPontuacoes']) , num_vezes

def getProduto(dfprodutos,idCat):
    return list(df[df['idCat']== idCat]['id'])


def calculoRecomenda(idProduto, idCliente):
    IDCat, NumVis, Pontuacao, NumPontuacoes = getIDCategoriaNumVisPontuacaoNumPontuacoes(idProduto)
    saldoProd = (sum(NumPontuacoes) * sum(Pontuacao)) / sum(NumVis)
    ID, IDCatAcima, Nivel = getIDCategoriaAcimaNivel(IDCat[0])
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