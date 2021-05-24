import { Container, Grid, Paper, Typography } from '@material-ui/core';
import DistributionHistoryList from './DistributionHistory/DistributionHistoryList'
import React, { useEffect } from 'react';
import IndividualDistribution from './Distribution/IndividualDistribution';
import MassDistribution from './Distribution/MassDistribution';
import { HOSTNAME } from '../../../../Constants';



const SwagDistribution = (props) => {

    const fetchDistributionHistory = () => {
        fetch(HOSTNAME + 'distribution-history')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    useEffect(fetchDistributionHistory, []);

    return (<section>
        <Grid container>
            <Grid item xs={12} md={6} container>
                <DistributionHistoryList/>
            </Grid>
            
            <Grid item xs={12} md={6} container 
                direction='column'>
                <IndividualDistribution/>
                <MassDistribution/>
            </Grid>
        </Grid>
    </section>)
}

export default SwagDistribution;