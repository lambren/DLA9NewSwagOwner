import React,  { useEffect, useState }  from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil'
import { HOSTNAME } from '../../../../Constants';
import { allOrdersState, allOrdersSearchState } from './../../../../recoil/atoms'
import { useSnackbar } from 'notistack'
import { Container,  Paper, Button,
    Typography, Grid,  CircularProgress, 
     makeStyles } 
    from '@material-ui/core';
import {  Refresh} from '@material-ui/icons';
import AllOrdersList from './AllOrdersList';
import AllOrdersPageSelect from './AllOrdersPageSelect';

const useStyles = makeStyles({
    numberInputWidth: {
        width: '80px',
    },
    gridMargin: {
        marginBottom: '5px',
    },

})

const AllOrders = (props) => 
{
    const classes = useStyles();
    const resetSearch = useResetRecoilState(allOrdersSearchState);

    const setAllOrders = useSetRecoilState(allOrdersState);
    const [currentItemPage, setCurrentItemPage] 
        = useState(0);

    const [loading, setLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const fetchOrders = (initial = true) => {
        setLoading(true);
        fetch(HOSTNAME + 'get-all-orders/')
        .then(res => res.json())
        .then(data => {
            if (data.status === 'SUCCESS')
            {
                setAllOrders(data.orders);
                if (!initial) enqueueSnackbar('Orders Refreshed', {
                    variant: 'success'
                })
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
    }

    useEffect(fetchOrders, [setAllOrders, enqueueSnackbar]);
    useEffect(resetSearch, [resetSearch])

    
    return (
        <section>
            <Container>
                <Paper className='list-paper'>
                    <Grid container justify='space-between' 
                        direction='row' className={classes.gridMargin}>
                        <Grid item xs={12} sm={4} md={7} lg={8}>
                            <Typography variant='h5' color='primary'>
                                All Orders
                            </Typography> 
                        </Grid>
                        <Grid item xs={12} sm={8} md={5} lg={4} wrap='nowrap'
                            container alignItems='center' justify='space-between'>

                            <AllOrdersPageSelect currentItemPage={currentItemPage}
                                setCurrentItemPage={setCurrentItemPage}/>

                        {
                            loading ? <CircularProgress/> : 
                            <Button color='primary'
                                startIcon={<Refresh/>}
                                onClick={() => fetchOrders(false)}>
                                Refresh
                            </Button>
                        }
                        </Grid>
                    </Grid>
                    <AllOrdersList currentItemPage={currentItemPage} 
                        setCurrentItemPage={setCurrentItemPage} 
                        loading={loading}/>
                </Paper>
            </Container>
        </section>
    )
}

export default AllOrders;