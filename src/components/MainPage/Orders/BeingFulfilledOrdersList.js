import { Paper, Typography, TableHead, TableContainer, 
    TableCell, TableRow, Table, Box, CircularProgress, 
    Grid, Button, TextField, ButtonGroup, Dialog } from '@material-ui/core';
import React, {useState} from 'react'
import {useRecoilValue} from 'recoil'
import BeingFulfilledOrdersItem from './BeingFulfilledOrdersItem';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Print } from '@material-ui/icons';
import { HOSTNAME } from './../../../Constants'
import { useSnackbar } from 'notistack'
import { allOrdersState, beingFulfilledOrdersState} from './../../../recoil/atoms'
import { useSetRecoilState } from 'recoil'

const BeingFulfilledOrdersList = (props) => {
    const { loading } = props;
    const { enqueueSnackbar } = useSnackbar();
    const beingFulfilledOrders = useRecoilValue(beingFulfilledOrdersState);

    const setBeingFulfilledOrders = useSetRecoilState(beingFulfilledOrdersState);
    const setAllOrders = useSetRecoilState(allOrdersState);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [clearing, setClearing] = useState(false);

    const [loginSearch, setLoginSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [managerSearch, setManagerSearch] = useState('');
    const [itemSearch, setItemSearch] = useState('');

    const onClearList = () => {
        setClearing(true);
        fetch(HOSTNAME + 'clear-being-fulfilled/', {
            method: 'POST',
        }).then(res => res.json())
        .then(data => {
            setClearing(false);
            if (data.status === 'SUCCESS') {

                setBeingFulfilledOrders(data.beingFulfilled);
                setAllOrders(data.orders);

                enqueueSnackbar("Today's fulfillment Clear!", {
                    variant: 'success'
                })
            }
            else {
                enqueueSnackbar("Failed to clear today's fulfillment. Please try again later", {
                    variant: 'error'
                })
            }
        }).catch(e => {
            setClearing(false);
            console.log(e);
            enqueueSnackbar('Network Error: Please check your internet connection', {
                variant: 'error'
            })
        })
    }

    return(
        <Paper className='list-paper'>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <Button color='primary'
                    onClick={() => {
                        setDialogOpen(false);
                        onClearList();
                    }}>I have successfully printed the labels, clear today's fulfillment list now!</Button>
                <Button color='secondary'
                    onClick={() => setDialogOpen(false)}>
                    I did not print the label, I'll clear the list later!
                </Button>
            </Dialog>

            <Grid container justify='space-between' alignItems='center'>
                <Typography variant='h5' color='primary'>
                    Being Fufilled Orders
                </Typography> 
                { 
                    clearing ? <CircularProgress/> : 
                    <ButtonGroup variant='text'size='small'>
                        <Button
                            onClick={(e) => {
                                window.open(HOSTNAME + 'print-labels');
                                setDialogOpen(true);
                            }}
                            startIcon={<Print/>}
                            color='primary'>
                                Print
                        </Button>

                        <Button 
                            startIcon={<DeleteForeverIcon/>}
                            onClick={onClearList}
                            color='secondary'>
                                Clear
                        </Button>
                        
                    </ButtonGroup> 
            }
            </Grid>
            {   
                loading ? 
                <Box className='loader-wrapper'>
                    <CircularProgress color='secondary' size='3rem'/>
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
                                    <TextField label='Mgr'
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
                       
    
                        {beingFulfilledOrders.filter(item => item.user_name.toLowerCase().includes(loginSearch.toLowerCase()))
                                .filter(item => item.user_first_name ? 
                                    item.user_first_name.toLowerCase().includes(nameSearch.toLowerCase()) : true)
                                .filter(item => item.user_manager ? 
                                    item.user_manager.toLowerCase().includes(managerSearch.toLowerCase()) : true)
                                .filter(item => item.swag_name && 
                                    item.swag_name.toLowerCase().includes(itemSearch.toLowerCase())).map(item => 
                            <BeingFulfilledOrdersItem item={item} 
                                key={item.cart_id}/>
                        )}
  
                        
                    </Table>
                </TableContainer>
                
            }
        </Paper> 
    )

} 

export default BeingFulfilledOrdersList;