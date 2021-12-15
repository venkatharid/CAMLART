from flask import Flask
from flask_cors import CORS
import pandas as pd
import seaborn as sns
import xgboost as xgb
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import xgboost as xgb
xgb_regressor = xgb.XGBRegressor()
import numpy as np
import datetime as dt
from datetime import timedelta
import warnings
from keras.models import load_model
import pickle
import logging
import boto3
import botocore

warnings.filterwarnings("ignore")

# Members API Route

app = Flask(__name__)
CORS(app)


def importfile():
    BUCKET_NAME = 'camlart' # replace with your bucket name
    KEY = 'xgboost-for-covid19-prediction/model/xgboost.sav' # replace with your object key
    s3 = boto3.resource('s3')
    try:
        s3.Bucket(BUCKET_NAME).download_file(KEY, 'xgboost.sav')
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("The object does not exist.")
        else:
            raise

@app.route("/app")
def index():
    data = pd.read_csv("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv")
    importfile()
    data = data.replace(np.nan, 0) #to replace missing values by 0
    df = data[['date','total_cases','location','total_deaths','total_vaccinations']]
    df['date'] =  pd.to_datetime(df['date'], format='%Y-%m-%d')
    logging.getLogger().setLevel(logging.CRITICAL)
    plt.rcParams.update({'figure.figsize':(17,3),'figure.dpi':300})
    fig,ax=plt.subplots()
    sns.lineplot(data=df.tail(200),x='date',y='total_cases') #graph to display last 200 days data inside tail function 
                                                         # you can change the value 
    plt.grid(linestyle='-',linewidth=0.3)
    ax.tick_params(axis='x',rotation=90)
    print("Total cases",df['total_cases'].count())
    df.shape
    c=int(df['total_cases'].count()*0.8)
    print("80% Data",c)#to split 20 percent data
    d=df['date'][c]
    features=['total_cases','total_vaccinations']
    label=['total_deaths']
    test_df=df[df['date']>=d]
    train_df=df[df['date']<d]
    X_train,y_train=train_df[features],train_df[label]
    X_test,y_test=test_df[features],test_df[label]
    reg = pickle.load(open('xgboost.sav', 'rb'))
    predictions=reg.predict(X_test)
    accuracy = reg.score(X_train,y_train)
    test_df=test_df.reset_index().drop('index',axis=1)
    test_df['predictions']=pd.Series(predictions)
    js = test_df.to_json(orient = 'records')
    return js

if __name__ == '__main__':
    app.run(debug=True)




