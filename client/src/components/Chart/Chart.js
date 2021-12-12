import React, { useState} from 'react';
import styles from './Chart.module.css';
import { Bar, Line } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';

const Chart = ({ countryData, countryDataByDates }) => {
    const [isBarChart, setBarChart] = useState(true);

    const barChart = (
        countryData && countryData[0]?.total_cases >= 0 ?
            <Bar
                data={{   // two braces, one for using JS code in JSX and second for object
                    labels: ['Total Cases', 'Total Vaccinations', 'Deaths', 'New Cases'],
                    datasets: [{
                        data: [countryData[0].total_cases ? countryData[0].total_cases : 0,
                        countryData[0]?.total_vaccinations ? countryData[0]?.total_vaccinations : 0,
                        countryData[0]?.total_deaths ? countryData[0]?.total_deaths : 0,
                        countryData[0]?.new_cases ? countryData[0]?.new_cases : 0],
                        label: 'People',
                        backgroundColor: ['rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)', 'rgba(239,255,0,0.5)']
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current status of ${countryData[0]?.location ? countryData[0]?.location : 'country'}` }
                }}
            /> : null

    )

    const lineChart = (
        countryDataByDates && countryDataByDates.length >= 0 ?
            <>
                <Line
                    data={{    // two braces, one for using JS code in JSX and second for object 
                        labels: countryDataByDates.map((data, i) => data.date),
                        datasets: [{
                            data: countryDataByDates.map((data) => data?.total_cases),
                            label: 'Total Infected',
                            borderColor: 'rgba(0,0,255)',
                            backgroundColor: 'rgba(0,0,255,0.5)',
                            fill: true
                        },
                        {
                            data: [150000000],
                            label: 'Predicted Infected',
                            borderColor: 'rgba(0,0,255)',
                            backgroundColor: 'rgba(0,0,255)',
                            fill: true
                        }
                        ]
                    }}
                    options={{
                        legend: { display: true },
                        title: { display: true, text: `Current status of ${countryData[0]?.location ? countryData[0]?.location : 'country'}` }
                    }}
                />

                <div className={styles.marginBottom} />

                <Line
                    data={{    // two braces, one for using JS code in JSX and second for object 
                        labels: countryDataByDates.map((data, i) => data.date),
                        datasets: [{
                            data: countryDataByDates.map((data) => data?.total_vaccinations),
                            label: 'Total Vaccinations',
                            borderColor: 'rgba(0,255,0)',
                            backgroundColor: 'rgba(0,255,0,0.5)',
                            fill: true
                        },
                        {
                            data: [150000000],
                            label: 'Predicted Total Vaccinations',
                            borderColor: 'rgba(0,255,0)',
                            backgroundColor: 'rgba(0,255,0)',
                            fill: true
                        }
                        ]
                    }}
                    // options={{
                    //     legend: { display: true },
                    //     title: { display: true, text: `Current status of ${countryData[0]?.location ? countryData[0]?.location : 'country'}` }
                    // }}
                />

                <div className={styles.marginBottom} />

                <Line
                    data={{    // two braces, one for using JS code in JSX and second for object 
                        labels: countryDataByDates.map((data, i) => data.date),
                        datasets: [{
                            data: countryDataByDates.map((data) => data?.total_deaths),
                            label: 'Deaths',
                            borderColor: 'rgba(255,0,0)',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill: true
                        },
                        {
                            data: [150000000],
                            label: 'Predicted Deaths',
                            borderColor: 'rgba(255,0,0)',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill: true
                        }
                        ]
                    }}
                    // options={{
                    //     legend: { display: true },
                    //     title: { display: true, text: `Current status of ${countryData[0]?.location ? countryData[0]?.location : 'country'}` }
                    // }}
                /> </> : <i className="fas fa-spinner fa-spin fa-fw fa-5x"></i>

    );


    return (
        <div className={styles.container}>
            <Button variant="outlined"
                className={styles.btn}
                onClick={() => setBarChart(!isBarChart)}
            >
                {isBarChart ? 'Line' : 'Bar'} graph
            </Button>

            {isBarChart ? barChart : lineChart}
        </div>
    )
}

export default Chart;