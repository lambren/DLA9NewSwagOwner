import { Paper, Typography, Grid, Button } from '@material-ui/core';
import React from 'react';
import DistributionList from './DistributionList'

const DistributionHistoryList = (props) => {
    return(
        <Paper className='list-paper'>
            <Grid container justify='space-between'>
                <Grid item xs={5}>
                    <Typography variant='h5' color='primary'>
                        Distribution History
                    </Typography>
                </Grid>

                <Grid item xs={4} container>
                    <Button>+</Button>
                    <Typography>1</Typography>
                    <Button>-</Button>
                </Grid>

                    <Button variant='text'
                        color='primary'
                        >Refresh
                    </Button>

            </Grid>
            <DistributionList/>
        </Paper>
    )
}

export default DistributionHistoryList;