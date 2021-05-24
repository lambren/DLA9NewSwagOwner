import { Typography, Paper, TextField, Box,
        Grid, Button } from '@material-ui/core'
import React from 'react'
import { ReactComponent as SendMoney } 
    from './../../../../../assets/transfer_money.svg'


const IndividualDistribution = (props) => {
    return(
        <Paper className='paper-container'>
            <Typography variant='h5' color='primary'>
                Individual Distribution
            </Typography>
            <Grid container>

                <Grid item xs={12} md={6} 
                    container direction='column'>
                    <TextField label='Amount' />
                    <TextField label='Reason' />
                    <TextField label='Scan Badge or Enter Login' />

                    <Grid container direction='row-reverse'>
                        <Box marginTop='12px'>
                            <Button color='primary'>Confirm</Button>
                        </Box>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6}
                        container justify='center'
                        alignItems='center'>
                        <SendMoney style={{
                            height: '150px',
                            width: 'auto'
                        }}/>
                </Grid>

            </Grid>
        </Paper>
    )
}

export default IndividualDistribution;