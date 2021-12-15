import React, { useState, useEffect } from 'react';
import styles from './Chart.module.css';
import { Bar, Line } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';

const Chart = ({ countryData, countryDataByDates, predictedDataForCntry }) => {
    const [isBarChart, setBarChart] = useState(false);

    const barChart = (
        countryData && countryData[0]?.total_cases >= 0 ?
            <>
                <Bar
                    data={{   // two braces, one for using JS code in JSX and second for object
                        labels: ['Total Infected', `Predicted Infected till ${predictedDataForCntry[0].date}`],
                        datasets: [{
                            data: [countryData[0].total_cases ? countryData[0].total_cases : 0,
                            predictedDataForCntry[0].total_cases ? predictedDataForCntry[0].total_cases.toFixed() : 0
                            ],
                            label: 'People',
                            backgroundColor: ['rgba(0,0,255)', 'rgba(0,0,255,0.5)']
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current status of ${countryData[0]?.location ? countryData[0]?.location : 'country'}` }
                    }}
                />

                <Bar
                    data={{
                        labels: ['Total Vaccinations', `Predicted Vaccinations till ${predictedDataForCntry[0].date}`],
                        datasets: [{
                            data: [
                                countryData[0]?.total_vaccinations ? countryData[0]?.total_vaccinations : 0,
                                predictedDataForCntry[0].total_vaccinations ? predictedDataForCntry[0].total_vaccinations.toFixed() : 0],
                            label: 'People',
                            backgroundColor: ['rgba(0,255,0)', 'rgba(0,255,0,0.5)']
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current status of ${countryData[0]?.location ? countryData[0]?.location : 'country'}` }
                    }}
                />

                <Bar
                    data={{
                        labels: ['Deaths', `Predicted Deaths till ${predictedDataForCntry[0].date}`],
                        datasets: [{
                            data: [
                                countryData[0]?.total_deaths ? countryData[0]?.total_deaths : 0,
                                predictedDataForCntry[0].total_deaths ? predictedDataForCntry[0].total_deaths.toFixed() : 0
                            ],
                            label: 'People',
                            backgroundColor: ['rgba(255,0,0)', 'rgba(255,0,0,0.5)']
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current status of ${countryData[0]?.location ? countryData[0]?.location : 'country'}` }
                    }}
                /></> : null

    )

    const lineChart = (
        countryDataByDates && countryDataByDates.length >= 0 ?
            <>
                <div className={styles.row}>
                    <Line
                        data={{    // two braces, one for using JS code in JSX and second for object 
                            labels: countryDataByDates.map((data, i) => data.date),
                            datasets: [{
                                data: countryDataByDates.map((data) => data?.total_cases),
                                label: 'Total Infected',
                                borderColor: 'rgba(0,0,255)',
                                fill: true
                            }
                            ]
                        }}
                        options={{
                            legend: { display: true },
                            title: { display: true, text: `Current status of ${countryData[0]?.location ? countryData[0]?.location : 'country'}` }
                        }}
                    />


                    <Line
                        data={{
                            labels: [...countryDataByDates, ...predictedDataForCntry].map((data, i) => data.date),
                            datasets: [{
                                data: [...countryDataByDates, ...predictedDataForCntry].map((data) => data?.total_cases),
                                label: 'Predicted Infected',
                                borderColor: 'rgba(0,0,255)',
                                fill: true
                            }
                            ]
                        }}
                        options={{
                            legend: { display: true },
                            title: { display: true, text: `Predicted status of ${countryData[0]?.location ? countryData[0]?.location : 'country'}` }
                        }}
                    />

                </div>
                <div className={styles.marginBottom} />

                <div className={styles.row}>
                    <Line
                        data={{    // two braces, one for using JS code in JSX and second for object 
                            labels: countryDataByDates.map((data, i) => data.date),
                            datasets: [{
                                data: countryDataByDates.map((data) => data?.total_vaccinations),
                                label: 'Total Vaccinations',
                                borderColor: 'rgba(0,255,0)',
                                fill: true
                            }
                            ]
                        }}
                    />


                    <Line
                        data={{    // two braces, one for using JS code in JSX and second for object 
                            labels: [...countryDataByDates, ...predictedDataForCntry].map((data, i) => data.date),
                            datasets: [{
                                data: [...countryDataByDates, ...predictedDataForCntry].map((data) => data?.total_vaccinations),
                                label: 'Predicted Total Vaccinations',
                                borderColor: 'rgba(0,255,0)',
                                fill: true
                            }
                            ]
                        }}
                    />
                </div>
                <div className={styles.marginBottom} />

                <div className={styles.row}>
                    <Line
                        data={{    // two braces, one for using JS code in JSX and second for object 
                            labels: countryDataByDates.map((data, i) => data.date),
                            datasets: [{
                                data: countryDataByDates.map((data) => data?.total_deaths),
                                label: 'Deaths',
                                borderColor: 'rgba(255,0,0)',
                                fill: true
                            }
                            ]
                        }}

                    />

                    <Line
                        data={{
                            labels: [...countryDataByDates, ...predictedDataForCntry].map((data, i) => data.date),
                            datasets: [{
                                data: [...countryDataByDates, ...predictedDataForCntry].map((data) => data?.total_deaths),
                                label: 'Deaths',
                                borderColor: 'rgba(255,0,0)',
                                fill: true
                            }
                            ]
                        }}

                    />
                </div>
            </> : <i className="fas fa-spinner fa-spin fa-fw fa-5x"></i>

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