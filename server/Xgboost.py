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
    print(country)
    data=data.loc[data['location']== country]
    # For Deaths-df
    df = data[['date','total_deaths','location']]
    # For Confirmed Cases
    cc = data[['date','total_cases','location']]
    # For vaccination
    vc = data[['date', 'total_vaccinations','location']]
    df['date'] = pd.to_datetime(df['date']).dt.date
    df = pd.DataFrame(df.groupby(df['date'])['total_deaths'].sum())
    cc['date'] = pd.to_datetime(cc['date']).dt.date
    cc = pd.DataFrame(cc.groupby(cc['date'])['total_cases'].sum())
    vc['date'] = pd.to_datetime(vc['date']).dt.date
    vc = pd.DataFrame(vc.groupby(vc['date'])['total_vaccinations'].sum())
    training_df = df.groupby(['date'])['total_deaths'].sum().reset_index()
    training_df['date'] = pd.to_datetime(training_df['date']).dt.date
    training_df1 = cc.groupby(['date'])['total_cases'].sum().reset_index()
    training_df1['date'] = pd.to_datetime(training_df1['date']).dt.date
    training_df2 = vc.groupby(['date'])['total_vaccinations'].sum().reset_index()
    training_df2['date'] = pd.to_datetime(training_df2['date']).dt.date
    training_df['Year'] = pd.to_datetime(training_df['date']).dt.year
    training_df['Week'] = pd.to_datetime(training_df['date']).dt.week
    training_df['Day']  = pd.to_datetime(training_df['date']).dt.day
    training_df['WeekDay'] = pd.to_datetime(training_df['date']).dt.dayofweek
    training_df['Weekend'] = training_df.WeekDay.isin([5, 6]).astype(int)
    training_df.set_index('date', inplace=True) 
    training_df1['Year'] = pd.to_datetime(training_df1['date']).dt.year
    training_df1['Week'] = pd.to_datetime(training_df1['date']).dt.week
    training_df1['Day']  = pd.to_datetime(training_df1['date']).dt.day
    training_df1['WeekDay'] = pd.to_datetime(training_df1['date']).dt.dayofweek
    training_df1['Weekend'] = training_df1.WeekDay.isin([5, 6]).astype(int)
    training_df1.set_index('date', inplace=True)
    training_df2['Year'] = pd.to_datetime(training_df2['date']).dt.year
    training_df2['Week'] = pd.to_datetime(training_df2['date']).dt.week
    training_df2['Day']  = pd.to_datetime(training_df2['date']).dt.day
    training_df2['WeekDay'] = pd.to_datetime(training_df2['date']).dt.dayofweek
    training_df2['Weekend'] = training_df2.WeekDay.isin([5, 6]).astype(int)
    training_df2.set_index('date', inplace=True)
    gridcv_xgb = pickle.load(open('China_Deaths.sav', 'rb'))
    gridcv_xgb1 = pickle.load(open('China_Deaths.sav', 'rb'))
    gridcv_xgb2 = pickle.load(open('China_Deaths.sav', 'rb'))
    test = pd.read_excel('dates.xlsx', parse_dates=[0], index_col=[0], engine='openpyxl')
    pred_x, pred_y = create_features(test, label='Deaths')
    test['xgb_Prediction_Deaths'] = gridcv_xgb.predict(pred_x)
    pred_x1, pred_y1 = create_features(test, label='Confirmed Cases')
    test['xgb_Prediction_cc'] = gridcv_xgb1.predict(pred_x1)
    pred_x2, pred_y2 = create_features(test, label='Vaccinations')
    test['xgb_Prediction_vc'] = gridcv_xgb2.predict(pred_x1)
    test.drop(['Deaths','dayofweek', 'quarter', 'month', 'year', 'dayofyear','dayofmonth', 'weekofyear','Confirmed Cases','Vaccinations'], axis=1, inplace=True)
    test.reset_index(inplace=True)
    test["Date"] = test["Date"].astype(str)
    js = test.to_json(orient="records")
    print(js)
    return js

    
if __name__ == '__main__':
    app.run(debug=True)