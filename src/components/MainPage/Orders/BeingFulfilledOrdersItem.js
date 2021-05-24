import React, {useState} from 'react'
import { TableBody, TableCell, TableRow, 
    IconButton, CircularProgress  } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import {useSnackbar} from 'notistack';
import ConfirmationButton from './../ConfirmationButton';
import { HOSTNAME } from '../../../Constants';
import { useSetRecoilState } from 'recoil'
import { allOrdersState, beingFulfilledOrdersState } from './../../../recoil/atoms'

const ReceivedOrdersItem = (props) => {
    const [confirmation, setConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const { item } = props;
    const { enqueueSnackbar } = useSnackbar();

    const setAllOrders = useSetRecoilState(allOrdersState);
    const setBeingFulfilledOrders = useSetRecoilState(beingFulfilledOrdersState);

    const cancelFulfillment = () => {
        setLoading(true);
        fetch(HOSTNAME + 'cancel-fulfillment/', {
            method: 'POST', 
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                cart_id: item.cart_id
            })
        }).then(res => res.json())
        .then(data => {
            setLoading(false);
            if (data.status === 'SUCCESS')
            {
                enqueueSnackbar('Successfully Cancel Fulfillment.', {
                    variant: 'success',
                });
                setAllOrders(data.orders);
                setBeingFulfilledOrders(data.beingFulfilled);
            }
            else {
                enqueueSnackbar('Failed to Cancel Fulfillment. Please try again later.', {
                    variant: 'error',
                });
            }
        }).catch(e => {
            setLoading(false);
            enqueueSnackbar('Network Error: Please check your Internet.', {
                variant: 'error',
            });
            console.log(e);
        });
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
                        toExecute={cancelFulfillment}
                        confirmationTitle='Confirm Removal'/>
                    :
                    <IconButton 
                        size='small'
                        color='secondary' 
                        title='Cancel Fulfillment'
                        onClick={() => setConfirmation(true)}>
                        <ClearIcon/>
                    </IconButton> 
                }
            </TableCell>
        </TableRow>
    </TableBody>)
    
}

export default ReceivedOrdersItem;