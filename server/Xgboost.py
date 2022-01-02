from flask import Flask,request
from warnings import filterwarnings
filterwarnings('ignore')
from sklearn.metrics import mean_squared_error, mean_absolute_error
from xgboost import plot_importance, plot_tree
from sklearn.metrics import r2_score
from sklearn.model_selection import GridSearchCV
import xgboost as xgb
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import time
import datetime as dt
from datetime import timedelta
from flask_cors import CORS
import warnings
import pickle

warnings.filterwarnings("ignore")


def create_features(df, label=None):
    df['dayofweek'] =pd.DatetimeIndex(df.index).dayofweek
    df['quarter'] =pd.DatetimeIndex(df.index).quarter
    df['month'] = pd.DatetimeIndex(df.index).month
    df['year'] = pd.DatetimeIndex(df.index).year
    df['dayofyear'] = pd.DatetimeIndex(df.index).dayofyear
    df['dayofmonth'] = pd.DatetimeIndex(df.index).day
    df['weekofyear'] = pd.DatetimeIndex(df.index).weekofyear
    X = df[[
 'dayofweek', 'quarter', 'month', 'year', 'dayofyear',
 'dayofmonth', 'weekofyear'
 ]]
    if label:
        y = df[label]
        return X, y
    return X

# Members API Route

app = Flask(__name__)
CORS(app)

def mean_absolute_percentage_error(y_true, y_pred): # Calculates MAPE given y_true and y_pred 
        y_true, y_pred = np.array(y_true), np.array(y_pred)
        return np.mean(np.abs((y_true-y_pred ) / y_true)) * 100

@app.route("/app",methods = ['POST', 'GET'])
def index():
    if request.method == 'POST':
        country = request.json
    data = pd.read_csv("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv",parse_dates=True)
    data = data.replace(np.nan, 0) #to replace missing values by 0
    df = data[['date','total_deaths','location']]
    df= df.loc[df['location']=="China"]
    df['date'] = pd.to_datetime(df['date']).dt.date
    df = pd.DataFrame(df.groupby(df['date'])['total_deaths'].sum())
    training_df = df.groupby(['date'])['total_deaths'].sum().reset_index()
    training_df['date'] = pd.to_datetime(training_df['date']).dt.date
    training_df['Year'] = pd.to_datetime(training_df['date']).dt.year
    training_df['Week'] = pd.to_datetime(training_df['date']).dt.week
    training_df['Day']  = pd.to_datetime(training_df['date']).dt.day
    training_df['WeekDay'] = pd.to_datetime(training_df['date']).dt.dayofweek
    training_df['Weekend'] = training_df.WeekDay.isin([5, 6]).astype(int)
    training_df.set_index('date', inplace=True)
    filename = 'Xgboost.sav'
    gridcv_xgb = pickle.load(open(filename, 'rb'))
    test = pd.read_excel('predictionempty.xlsx', parse_dates=[0], index_col=[0], engine='openpyxl')
    pred_x, pred_y = create_features(test, label='Deaths')
    test['xgb_Prediction'] = gridcv_xgb.predict(pred_x)
    test.drop(['Deaths','dayofweek', 'quarter', 'month', 'year', 'dayofyear','dayofmonth', 'weekofyear'], axis=1, inplace=True)
    test.reset_index(inplace=True)
    test["Date"] = test["Date"].astype(str)
    js = test.to_json(orient="records")
    print(js)
    return js


    
if __name__ == '__main__':
    app.run(debug=True)