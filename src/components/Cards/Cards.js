import React from 'react';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css'



function Cards({data: {confirmed, recovered, deaths, lastUpdate}, country }) {
    //checking if the data is fetched and passed 
    if(!confirmed){
        return 'Loading.....'
    }

    
    return (
        <div className={styles.container} >
            <Grid container spacing={3} justify="center" >
                <Typography variant="h5" className={styles.title} gutterBottom >Current State {country ? `in : ${country}` : 'golbaly'} </Typography>
            </Grid>
            <Grid container spacing={3} justify="center" >
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color='textSecondary' className={styles.blue} gutterBottom >Infected</Typography>
                        <Typography variant='h4'  >
                            <CountUp
                                start={0}
                                end={confirmed.value}
                                duration = {3}
                                separator=","
                            />
                        </Typography>
                        <Typography color='textSecondary' >{new Date(lastUpdate).toDateString()} </Typography>
                        <Typography variant='body2' >Number of Active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography className={styles.green} color='textSecondary' gutterBottom >Recovered</Typography>
                        <Typography variant='h4'  >
                            <CountUp start={0}end={recovered.value}duration = {3}separator=","/>
                        </Typography>
                        <Typography color='textSecondary'  >{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2' >Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography className={styles.red} color='textSecondary' gutterBottom  >Deaths</Typography>
                        <Typography variant='h4'  >
                            <CountUp start={0} end={deaths.value} duration = {3}separator=","/>
                        </Typography>
                        <Typography color='textSecondary'  >{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2' >Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;
