import React, { useState, useRef } from 'react'
import { TableBody, TableCell, TableRow, 
    IconButton, ButtonGroup, makeStyles, CircularProgress } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ConfirmationButton from './../../ConfirmationButton';
import { HOSTNAME } from './../../../../Constants';
import { useSnackbar } from 'notistack'
import { useSetRecoilState } from 'recoil'
import { allOrdersState, beingFulfilledOrdersState } from './../../../../recoil/atoms'

const useStyles = makeStyles({
    backlogButton : {
        color: "#e0ce00",
    }
})

const ReceivedOrdersItem = (props) => {
    const [confirmation, setConfirmation] = useState(false);
    const [confirmationTitle, setConfirmationTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const setAllOrders = useSetRecoilState(allOrdersState);
    const setBeingFulfilledOrders = useSetRecoilState(beingFulfilledOrdersState);


    const clickedButton = useRef(0);
    const classes = useStyles();
    const { item } = props

    const { enqueueSnackbar } = useSnackbar();

    const postFetchOperation = (operation, data) => {
        setLoading(false);
        if (data.status === 'SUCCESS')
        {
            enqueueSnackbar(`${operation} Successful`, {
                variant: 'success',
            })
            setAllOrders(data.orders);
            setBeingFulfilledOrders(data.beingFulfilled);
        }
        else
        {
            enqueueSnackbar(`Error: ${operation} Failed. Please try again later.`,{
                variant: 'error'
            })
        }
    }

    const networkError = (e) => {
        setLoading(false);
        console.log(e);
        enqueueSnackbar('Error: Network Error. Please check your connection.')
    }

    const startOperation = (operation, link) => {
        setLoading(true);
        fetch(HOSTNAME + link, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                cart_id: item.cart_id,
            })
        }).then(res => res.json())
        .then(data => postFetchOperation(operation, data))
        .catch(e => networkError(e))
    }

    const backlogOrder = () => {
        startOperation('Backlog', 'back-order/')
    }

    const fulfillOrder = () => {
        startOperation('Fulfillment', 'fulfill-order/')
    }

    const cancelOrder = () => {
        startOperation('Cancellation', 'cancel-order/')
    }

    const toExecute = () => {
        switch(clickedButton.current)
        {
            case 0: 
                fulfillOrder();
                break;

            case 1: 
                backlogOrder();
                break;
            
            case 2: 
                cancelOrder();
                break;

            default: 
                enqueueSnackbar('ERROR: Unknown Button Clicked', {
                    variant: 'error'
                });
                break;
        }
    }


    return( 
        <TableBody>
            <TableRow>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.user_first_name}</TableCell>
                <TableCell>{item.user_manager}</TableCell>
                <TableCell>{item.swag_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                {
                    loading ? <CircularProgress/> :
                    confirmation ? 
                    <ConfirmationButton 
                        setConfirmation={setConfirmation}
                        toExecute={toExecute}
                        confirmationTitle={confirmationTitle}/>
                    :
                    <ButtonGroup>
                        <IconButton 
                            size='small'
                            color='primary' 
                            title='Fulfill Order'
                            onClick={() => {
                                clickedButton.current = 0;
                                setConfirmationTitle('Confirm Fulfillment');
                                setConfirmation(true);
                            }}>
                            <LibraryAddCheckIcon/>
                        </IconButton>

                        <IconButton 
                            size='small'
                            className={classes.backlogButton} 
                            title='Backlog Order'
                            onClick={() => {
                                clickedButton.current = 1;
                                setConfirmationTitle('Confirm Backlog');
                                setConfirmation(true);
                            }}>
                            <LibraryBooksIcon/>
                        </IconButton>

                        <IconButton 
                            size='small'
                            color='secondary' 
                            title='Cancel Order'
                            onClick={() => {
                                clickedButton.current = 2;
                                setConfirmationTitle('Confirm Cancellation');
                                setConfirmation(true);
                            }}>
                            <DeleteForever/>
                        </IconButton>
                    </ButtonGroup>
                }
                </TableCell>
            </TableRow>
        </TableBody>
    )
}

export default ReceivedOrdersItem;