import os
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


# Filenames 
RECOMMENDATIONS_PICKLE_FILENAME = "recommendations.pkl"
ORDERS_PICKLE_FILENAME = "orders.pkl"

MIN_SALES_PER_ITEM = 5 # Minimum number of sales a product needs to have recommendations calculated
NUM_RECOMMENDATIONS_PER_PRODUCT = 5 # Number of output recommendations (other productIds)

NEW_RECOMMENDATIONS_FREQUENCY = 500 # Calculate new recommendation every 500 new orders
RECOMMENDATION_MAX_ORDERS = 50000 # Maximmum number of order to consider for calculations


# Keep track of orders
def addOrder(orderId, productIds, clientId):
    # Read existing file or create if no previous order record exists
    orders_df = pd.read_pickle(ORDERS_PICKLE_FILENAME) if os.path.isfile(ORDERS_PICKLE_FILENAME) else pd.DataFrame(columns=["orderId, productId, clientId"])

    # Add order
    for productId in productIds:
        orders_df.append([orderId, productId, clientId])
    
    # Save orders pickle
    orders_df.to_pickle(ORDERS_PICKLE_FILENAME)

    # Check need for recalculation
    if (orders_df["orderId"].unique().size % NEW_RECOMMENDATIONS_FREQUENCY) == 0:
        calculateRecommendations()


# Get recommendations for product
def getProductRecommendations(productId):
    # Check if recommendations file exist
    if not os.path.isfile(RECOMMENDATIONS_PICKLE_FILENAME):
        return []

    # Read recommendations DataFrame
    recommendations = pd.read_pickle(RECOMMENDATIONS_PICKLE_FILENAME)

    # Get recommendations for productId (empty list if not available)
    return recommendations.loc[[productId]].recommendations.to_numpy()[0] if productId in recommendations.index else []


# Calculate recommendations
def calculateRecommendations():    
    # Read orders data
    orders_df = pd.read_pickle(ORDERS_PICKLE_FILENAME)

    # Each row is now a order, and the columns are the productIDs
    pivot_df = pd.pivot_table(orders_df, index='orderId', columns='productId', values="clientId", aggfunc='count')
    pivot_df.reset_index(inplace=True)
    pivot_df = pivot_df.fillna(0)
    pivot_df = pivot_df.drop('orderId', axis=1)

    # Get RECOMMENDATION_MAX_ORDERS, starting from most recent
    pivot_df = pivot_df.tail(RECOMMENDATION_MAX_ORDERS)
    
    # Filter out products without minimum amount of sales (little data for accurate recommendation)
    for label, content in pivot_df.iteritems():
        if np.sum(content) < MIN_SALES_PER_ITEM:
            pivot_df.drop(columns=label, inplace=True)

    # Get co-occurrence matrix
    co_matrix = pivot_df.T.dot(pivot_df)
    np.fill_diagonal(co_matrix.values, 0)

    # Get cosine similarities matrix
    cos_score_df = pd.DataFrame(cosine_similarity(co_matrix))
    cos_score_df.index = co_matrix.index
    cos_score_df.columns = np.array(co_matrix.index)

    # Get top X product recommendations
    product_recs = []
    for i in cos_score_df.index:
        product_recs.append(cos_score_df[cos_score_df.index!=i][i].sort_values(ascending=False)[0:NUM_RECOMMENDATIONS_PER_PRODUCT].index)
        
    # DataFrame that associates productId with its top recommendations
    product_recs_df = pd.DataFrame(product_recs)
    product_recs_df['recommendations'] = product_recs_df.values.tolist()
    product_recs_df.index = cos_score_df.index

    # Save recommendations DataFrame
    product_recs_df[['recommendations']].to_pickle(RECOMMENDATIONS_PICKLE_FILENAME)