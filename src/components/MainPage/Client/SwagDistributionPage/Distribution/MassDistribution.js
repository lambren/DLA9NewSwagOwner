import React from 'react'
import { Paper, Typography, Button,
    Grid, Box, TextField } from '@material-ui/core'

import { ReactComponent as MakeItRain } 
    from './../../../../../assets/make_it_rain.svg'


const MassDistribution = (props) => {
    return(
        <Paper className='paper-container'>
            <Typography variant='h5' color='primary'>
                Mass Distribution
            </Typography>
            <Grid container>
                <Grid item xs={12} md={6}
                    container justify='center'
                    alignItems='center'>
                    <MakeItRain style={{
                        height: '150px',
                        width: 'auto'
                    }}/>
                </Grid>

                <Grid item xs={12} md={6} 
                    container direction='column'>
                    <Typography>Please prepare and upload a CSV file with 3 columns in the following order:</Typography>
                    <ul>
                        <li><Typography>associate</Typography></li>
                        <li><Typography>swag</Typography></li>
                        <li><Typography>reason</Typography></li>
                    </ul>
                    <Button color='primary'>
                        <input type='file' hidden
                            id='mass-swag-distribution'>
                        </input>
                        <label htmlFor='mass-swag-distribution'>
                            Select CSV File to Upload
                        </label>
                    </Button>
                </Grid>
            </Grid>

        </Paper>
    )
}

export default MassDistribution;