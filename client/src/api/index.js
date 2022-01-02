import axios from 'axios';

const baseURL = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"

export const fetchData = async () => {

    try {
        const { data } = await axios.get(baseURL);   // destructuring data field only from response

        // converting data in array of objects
        const covidData = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                covidData.push([data[key]])
            }
        }

        return covidData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDataByDates = async () => {

    try {
        const { data } = await axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json');   // destructuring data field only from response

        const covidDataByDates = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                covidDataByDates.push([data[key]])
            }
        }

        return covidDataByDates;
    } catch (error) {
        console.log(error);
    }
}

export const putDatapython = async () => {
    var formData= {
        country: "China"
    }
    try {
        const article = { country: 'China' };
    axios.post('http://127.0.0.1:5000/app', article)
        .then(response => {
            console.log(response.data)
        })
      .catch(error => {
        console.log(error)
      })
    }
      catch (error) {
        console.log(error);
    }
};

putDatapython();