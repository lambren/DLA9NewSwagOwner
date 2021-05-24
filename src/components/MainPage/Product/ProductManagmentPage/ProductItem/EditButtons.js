import { CircularProgress, ButtonGroup, 
    IconButton } from '@material-ui/core';
import { Edit, DeleteForever } from '@material-ui/icons';

import React, { useState, useRef } from 'react'
import { HOSTNAME } from '../../../../../Constants';
import ConfirmationButton from '../../../ConfirmationButton';

import { productsState } from './../../../../../recoil/atoms';
import { useSetRecoilState } from 'recoil'

import { useSnackbar } from 'notistack'

const EditButtons = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    const setProducts = useSetRecoilState(productsState);
    const clickedButton = useRef(0);



    const { loading, setLoading,
        editMode, setEditMode, 
        swag_item_id, swag_name,
        price, stock, setSwag_name,
        setPrice, setStock } = props;

    const [confirmationTitle, 
        setConfirmationTitle] = useState('');

    const executeDelete = () => {
        setLoading(true);
        fetch(HOSTNAME + 'delete-swag-item/', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                swag_item_id
            })
        }).then(res => res.json())
        .then(data => {
            setLoading(false);
            if (data.status === 'SUCCESS')
            {
                enqueueSnackbar('Successfully Deleted Product', {
                    variant: 'success'
                });
                setProducts(data.swag_items);
            } else throw new Error('FAILED')
        }).catch(e => {
            setLoading(false);
            enqueueSnackbar('Failed to Delete Product', {
                variant: 'error'
            })
        })
    }

    const executeEdit = () => {
        setLoading(true);
        fetch(HOSTNAME + 'edit-swag-item', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                swag_item_id,
                swag_name,
                price: price ? price : 'DEFAULT',
                stock: stock ? stock : 'DEFAULT',
            })
        }).then(res => res.json())
        .then(data => {
            setSwag_name('');
            setStock('');
            setPrice('');
            setLoading(false); 
            if (data.status === 'SUCCESS')
            {
                enqueueSnackbar('Successfully Edited Product', {
                    variant: 'success'
                });
                setProducts(data.swag_items)
            } else throw new Error('FAILED');
        }).catch(e => {
            setLoading(false);
            enqueueSnackbar('Failed to Edit Product', {
                variant: 'error'
            })
        })
    }

    const toExecute = () => {
        switch(clickedButton.current) {
            case 1: 
                executeEdit();
                break;
            case 2:
                executeDelete();
                break;
            default: return 0;
        }
    }

    return (
        <div>{ loading ? <CircularProgress/> :
            editMode ? 
            <ConfirmationButton
                setConfirmation={setEditMode}
                toExecute={toExecute}
                confirmationTitle={confirmationTitle}/>
            :
            <ButtonGroup size='small'>
                <IconButton color='primary'
                    title='Edit Product'
                    onClick={() => {
                        setConfirmationTitle('Confirm Edit')
                        clickedButton.current = 1;
                        setEditMode(true);

                    }}>
                    <Edit></Edit>
                </IconButton>

                <IconButton color='secondary'
                    title='Delete Product'
                    onClick={() => {
                        setConfirmationTitle('Confirm Removal')
                        clickedButton.current = 2;
                        setEditMode(true);
                    }}>
                    <DeleteForever>
                    </DeleteForever>
                </IconButton>
            </ButtonGroup>
        }</div>
    )
}

export default EditButtons;