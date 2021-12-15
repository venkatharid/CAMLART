import React from 'react'
import moment from 'moment'
import Spinner from '../Spinner/Spinner';
import { Card, CardContent, Typography, Grid, makeStyles } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';   // this is to apply two or more classes to div


const Cards = ({ countryData, predictedDataForCntry }) => {

    return (
        <div className={styles.container}>
            
            <Typography className={styles.heading} variant='subtitle2' gutterBottom component="div">
                Current status of {countryData[0]?.location ? countryData[0]?.location : '###'}
            </Typography>

            <Grid container spacing={2} justify='center'>
                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            <i style={{ color: "rgba(0,0,255,0.5)", width: '25px' }} className="fas fa-clinic-medical"></i> {' '}Total Cases
                        </Typography>

                        <Typography variant='h5' gutterBottom style={{width: 'auto'}}>
                            {countryData && countryData[0]?.total_cases >= 0 ?
                                <CountUp
                                    start={0}
                                    end={countryData[0].total_cases ? countryData[0].total_cases : 0}
                                    separator=','
                                    duration={2.1}  // seconds
                                /> : <Spinner />}
                        </Typography>

                        <Typography variant='body2' gutterBottom>
                            Total number of cases of COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            <i style={{ color: "rgba(0,0,255,0.5)", width: '25px' }} className="fas fa-clinic-medical"></i> {' '}Predicted Total Cases
                        </Typography>

                        <Typography variant='h5' gutterBottom style={{width: 'auto'}}>
                            {countryData && countryData[0]?.total_cases >= 0 ?
                                <CountUp
                                    start={0}
                                    end={predictedDataForCntry[0].total_cases ? predictedDataForCntry[0].total_cases : 0}
                                    separator=','
                                    duration={2.1}  // seconds
                                /> : <Spinner />}
                        </Typography>

                        <Typography variant='body2' gutterBottom>
                           Predicted Total number of cases of COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            <i style={{ color: "rgba(0,255,0,0.5)", width: '25px' }} className="fas fa-hospital-user"></i>{' '}Vaccinations
                        </Typography>

                        <Typography variant='h5' gutterBottom>
                            {countryData && countryData[0]?.total_vaccinations >= 0 ?
                                <CountUp
                                    start={0}
                                    end={countryData[0].total_vaccinations ? countryData[0].total_vaccinations : 0}
                                    separator=','
                                    duration={2.1}  // seconds
                                /> : <Spinner />}
                        </Typography>
             
                        <Typography variant='body2' gutterBottom>
                            Number of vaccinations of COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            <i style={{ color: "rgba(0,255,0,0.5)", width: '25px' }} className="fas fa-hospital-user"></i>{' '}Predicted Vaccinations
                        </Typography>

                        <Typography variant='h5' gutterBottom>
                            {countryData && countryData[0]?.total_vaccinations >= 0 ?
                                <CountUp
                                    start={0}
                                    end={predictedDataForCntry[0].total_vaccinations ? predictedDataForCntry[0].total_vaccinations : 0}
                                    separator=','
                                    duration={2.1}  // seconds
                                /> : <Spinner />}
                        </Typography>
             
                        <Typography variant='body2' gutterBottom>
                            Predicted Number of vaccinations of COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            <i style={{ color: "rgba(255,0,0.5)", width: '25px' }} className="fas fa-skull-crossbones"></i>{' '}Deaths
                        </Typography>

                        <Typography variant='h5' gutterBottom>
                            {countryData && countryData[0]?.total_deaths >= 0 ?
                                <CountUp
                                    start={0}
                                    end={countryData[0].total_deaths ? countryData[0].total_deaths : 0}
                                    separator=','
                                    duration={2.1}  // seconds
                                /> : <Spinner />}
                        </Typography>
              
                        <Typography variant='body2' gutterBottom>
                            Number of deaths caused by COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            <i style={{ color: "rgba(255,0,0.5)", width: '25px' }} className="fas fa-skull-crossbones"></i>{' '}Predicted Deaths
                        </Typography>

                        <Typography variant='h5' gutterBottom>
                            {countryData && countryData[0]?.total_deaths >= 0 ?
                                <CountUp
                                    start={0}
                                    end={predictedDataForCntry[0].total_deaths ? predictedDataForCntry[0].total_deaths : 0}
                                    separator=','
                                    duration={2.1}  // seconds
                                /> : <Spinner />}
                        </Typography>
              
                        <Typography variant='body2' gutterBottom>
                            Predicted Number of deaths caused by COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

            </Grid>
            <Typography color='textSecondary' className={styles.lastupdate}>
                            LastUpdated: {countryData[0]?.last_updated_date && moment(countryData[0].last_updated_date).format("DD-MMM-YYYY")}
            </Typography>
        </div>
    )
}

export default Cards;