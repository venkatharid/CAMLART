import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import { fetchData, fetchDataByDates } from './api/index';
//import coronaImage from './image/image.png'
import Map from './components/Map/Map';
import Layout from './components/Layout';
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core'

const theme = createTheme({    // it will override default setting of mui
  palette: {
    primary: {
      main: '#fefefe'       // here it changing primary clor of mui
    }
  }
})
class App extends React.Component {
  state = {
    globalData: [],
    countryData: [],
    covidGlobalDataByDates: [],
    countryDataByDates: []
  }


  async componentDidMount() {
    const fetchedData = await fetchData();  // api is giving data in object
    this.setState({ globalData: fetchedData });

    const countryData = this.state.globalData.filter(country => country[0].location === 'World')
    this.setState({ countryData: countryData[0] });

    const globaldataByDates = await fetchDataByDates();
    this.setState({ covidGlobalDataByDates: globaldataByDates });

    const countryDataByDates = this.state.covidGlobalDataByDates.filter(country => country[0].location === 'World')
    this.setState({ countryDataByDates: countryDataByDates[0][0]['data'] });
  }

  handleCountryChange = async (countryName) => {
    const countryData = this.state.globalData.filter(country => country[0].location === countryName)

    const countryDataByDates = this.state.covidGlobalDataByDates.filter(country => country[0].location === countryName);

    if (countryData.length) {
      this.setState({
        countryData: countryData[0]
      })

      if (countryDataByDates.length) {
        this.setState({ countryDataByDates: countryDataByDates[0][0]['data'] })
      }
    } else {
      this.setState({
        countryDataByDates: []
      })
    }
  }



  render() {
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          <Router>
            <Layout>             {/* Layout comp is not part of mui, i have created that to apply common stylings for all pages*/}
              <Switch>
                <Route path="/" exact>
                  <div className={styles.container}>
                    {/* <img className={styles.image} src={coronaImage} alt='logo' /> */}
                    <Cards countryData={this.state.countryData} />
                    <CountryPicker countriesData={this.state.globalData} handleCountryChange={this.handleCountryChange} />

                    <Chart
                      countryData={this.state.countryData}
                      countryDataByDates={this.state.countryDataByDates}
                    />
                  </div>
                </Route>
                <Route path="/map">
                  <Map
                    _globalData={this.state.globalData}
                  />
                </Route>
              </Switch>
            </Layout>
          </Router>
        </ThemeProvider>
      </Fragment>
    )
  };
}

export default App;
