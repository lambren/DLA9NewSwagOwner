import { Paper, Typography, TableHead, TableContainer, 
    TableCell, TableRow, Table, CircularProgress, Box, 
    TextField, Grid, Button } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import React, { useState } from 'react'
import {useRecoilValue} from 'recoil'
import { HOSTNAME } from '../../../../Constants';
import { backedOrdersState } from '../../../../recoil/selectors';
import ReceivedOrdersItem from './ReceivedOrdersItem'
import { useSetRecoilState } from 'recoil'
import { allOrdersState, beingFulfilledOrdersState } from './../../../../recoil/atoms'
import { useSnackbar } from 'notistack'

const ReceivedOrdersList = (props) => {
    const { loading } = props;
    const receivedOrders = useRecoilValue(backedOrdersState);
    const [refreshing, setRefreshing] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const setAllOrders = useSetRecoilState(allOrdersState);
    const setBeingFulfilledOrders = useSetRecoilState(beingFulfilledOrdersState);

    const [loginSearch, setLoginSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [managerSearch, setManagerSearch] = useState('');
    const [itemSearch, setItemSearch] = useState('');

    const onRefresh = (props) => {
        setRefreshing(true);
        fetch(HOSTNAME + 'get-all-orders/')
        .then(res => res.json())
        .then(data => {
            setRefreshing(false);
            if (data.status === 'SUCCESS')
            {
                enqueueSnackbar('Orders Refreshed', {
                    variant: 'success'
                })
                setAllOrders(data.orders);
                setBeingFulfilledOrders(data.beingFulfilled);
            }
            else {
                enqueueSnackbar('Failed to fetch orders. Try again later', {
                    variant: 'error'
                })
            }
        }).catch(e => {
            setRefreshing(false);
            console.log(e);
            enqueueSnackbar('Network Error: Please check your internet!', {
                variatn: 'error'
            })
        })
    }
    
    return(
        <Paper className='list-paper'>
            <Grid container justify='space-between' alignItems='center'>
                <Typography variant='h5' color='primary'>
                    Backlog Orders
                </Typography>
                {
                    refreshing ? <CircularProgress/> :
                        <Button startIcon={<Refresh/>}
                            color='primary'
                            onClick={onRefresh}>
                            Refresh
                        </Button>  
                }
            </Grid>
            {
                loading ? 
                    <Box className='loader-wrapper'>
                        <CircularProgress size='3rem'/>
                    </Box> :
                    <TableContainer className='table-container'>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <TextField label='Login'
                                            variant='standard'
                                            onChange={e => setLoginSearch(e.target.value)}>
                                        </TextField>
                                    </TableCell>

                                    <TableCell>
                                        <TextField label='Name'
                                            variant='standard'
                                            onChange={e => setNameSearch(e.target.value)}>
                                        </TextField>
                                    </TableCell>

                                    <TableCell>
                                        <TextField label='Manager'
                                            variant='standard'
                                            onChange={e => setManagerSearch(e.target.value)}>
                                        </TextField>
                                    </TableCell>

                                    <TableCell>
                                        <TextField label='Item'
                                            variant='standard'
                                            onChange={e => setItemSearch(e.target.value)}>
                                        </TextField>
                                    </TableCell>

                                    <TableCell>
                                        <Typography>Qty</Typography>
                                    </TableCell>

                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            {receivedOrders.filter(item => item.user_name.toLowerCase().includes(loginSearch.toLowerCase()))
                                .filter(item => item.user_first_name ? 
                                    item.user_first_name.toLowerCase().includes(nameSearch.toLowerCase()) : true)
                                .filter(item => item.user_manager ? 
                                    item.user_manager.toLowerCase().includes(managerSearch.toLowerCase()) : true)
                                .filter(item => item.swag_name && 
                                    item.swag_name.toLowerCase().includes(itemSearch.toLowerCase()))
                                .map(item => 
                                <ReceivedOrdersItem item={item} key={item.cart_id}/>
                            )}
                        </Table>
                    </TableContainer>
            }
        </Paper> 
    )

} 

export default ReceivedOrdersList;