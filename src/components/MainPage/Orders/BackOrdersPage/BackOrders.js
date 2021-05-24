import { Grid, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil'
import { HOSTNAME } from '../../../../Constants';
import BeingFulfilledOrdersList from '../BeingFulfilledOrdersList';
import { allOrdersState, beingFulfilledOrdersState } from './../../../../recoil/atoms' 
import ReceivedOrdersList from './ReceivedOrdersList';
import {useSnackbar} from 'notistack'

const useStyles = makeStyles({
    limitGridHeight: {
        height: "100%"
    }
})

const BackOrders = (props) => {
        const classes = useStyles();
        const setAllOrders = useSetRecoilState(allOrdersState);
        const setBeingFulfilledOrders = useSetRecoilState(beingFulfilledOrdersState);
        const [loading, setLoading] = useState(false);
    
        const { enqueueSnackbar } = useSnackbar();
    
        useEffect(() => {
            setLoading(true);
            fetch(HOSTNAME + 'get-all-orders/')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'SUCCESS')
                {
                    setAllOrders(data.orders);
                    setBeingFulfilledOrders(data.beingFulfilled);
                }
                else {
                    enqueueSnackbar('Failed to retreive orders. Please try again later',
                    {
                        variant: 'error',
                    })
                }
            }).catch(e => {
                enqueueSnackbar('Connection Error: Please check your internet!',
                {
                    variant: 'error',
                })
            }).finally(() => {
                setLoading(false);
            })
        }, [setAllOrders, setBeingFulfilledOrders, enqueueSnackbar])
    
    
        return (
        <section>
            <Grid container>
                <Grid item xs={12} lg={7} className={classes.limitGridHeight}>
                    <ReceivedOrdersList loading={loading}/>
                </Grid>
    
                <Grid item xs={12} lg={5} className={classes.limitGridHeight}>
                    <BeingFulfilledOrdersList loading={loading}/>
                </Grid>
            </Grid>
        </section>)

}

export default BackOrders