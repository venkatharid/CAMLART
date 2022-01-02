from flask import Flask,request
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import warnings
import pickle
import itertools
from datetime import datetime
warnings.filterwarnings("ignore")
plt.style.use('fivethirtyeight')
import pandas as pd
import statsmodels.api as sm
import matplotlib
import requests
matplotlib.rcParams['axes.labelsize'] = 14
matplotlib.rcParams['xtick.labelsize'] = 12
matplotlib.rcParams['ytick.labelsize'] = 12
matplotlib.rcParams['text.color'] = 'k'

warnings.filterwarnings("ignore")

# Members API Route

app = Flask(__name__)
CORS(app)

def _convert_date_str(df):
    try:
        df.columns = list(df.columns[:4]) + [datetime.strptime(d, "%m/%d/%y").date().strftime("%Y-%m-%d") for d in df.columns[4:]]
    except:
        print('_convert_date_str failed with %y, try %Y')
        df.columns = list(df.columns[:4]) + [datetime.strptime(d, "%m/%d/%Y").date().strftime("%Y-%m-%d") for d in df.columns[4:]]


@app.route("/app",methods = ['POST', 'GET'])
def index():
    if request.method == 'POST':
        country = request.json
    for filename in ['time_series_covid19_confirmed_global.csv',
                 'time_series_covid19_deaths_global.csv',
                 'time_series_covid19_recovered_global.csv',
                 'time_series_covid19_confirmed_US.csv',
                 'time_series_covid19_deaths_US.csv']:
        url = f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/{filename}'
        myfile = requests.get(url)
        open(filename, 'wb').write(myfile.content)

    deaths_global_df = pd.read_csv('time_series_covid19_deaths_global.csv')
    _convert_date_str(deaths_global_df)
    removed_states = "Recovered|Grand Princess|Diamond Princess"
    removed_countries = "US|The West Bank and Gaza"

    deaths_global_df.rename(columns={"Province/State": "Province_State", "Country/Region": "Country_Region"}, inplace=True)
    deaths_global_df    = deaths_global_df[~deaths_global_df["Province_State"].replace(np.nan, "nan").str.match(removed_states)]
    deaths_global_df    = deaths_global_df[~deaths_global_df["Country_Region"].replace(np.nan, "nan").str.match(removed_countries)]
    deaths_global_melt_df = deaths_global_df.melt(id_vars=['Country_Region', 'Province_State', 'Lat', 'Long'], value_vars=deaths_global_df.columns[4:], var_name='Date', value_name='Deaths')
    deaths=deaths_global_melt_df[["Date","Deaths","Country_Region"]]
    # deaths=pd.to_datetime(deaths["Date"])
    deaths.to_csv("deaths.csv")
    deaths=pd.read_csv('deaths.csv', parse_dates=['Date'])
    deaths = deaths.sort_values('Date')
    deaths.isnull().sum()
    deaths['Country_Region'].value_counts()
    China = deaths.loc[deaths['Country_Region'] == country] #selecting the country
    China.drop('Country_Region', axis=1, inplace=True) # dropping unnecessary columns
    China = China.sort_values('Date')
    China =China.groupby('Date')['Deaths'].sum().reset_index()
    China = China.set_index('Date')
    y = China['Deaths'].resample('MS').mean()
    p = d = q = range(0, 2)
    #pdq = list(itertools.product(p, d, q))
    #seasonal_pdq = [(x[0], x[1], x[2], 12) for x in list(itertools.product(p, d, q))]
    filename = 'arima.sav'
    mod = pickle.load(open(filename, 'rb'))
    results = mod.fit()
    pred = results.get_prediction(start=pd.to_datetime('2021-11-1'), end=pd.to_datetime('2021-12-10'),dynamic=True)
    pred_ci = pred.conf_int()
    js = str(pred_ci["upper Deaths"][2])
    print(js)
    return js
    
if __name__ == '__main__':
    app.run(debug=True)