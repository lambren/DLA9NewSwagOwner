import { Dialog, DialogContent, DialogTitle, 
    TextField, Button, Grid, makeStyles,
    Checkbox, Typography,
    FormControlLabel, Box, CircularProgress,
    } from '@material-ui/core'
import { useRecoilValue,  useResetRecoilState, useSetRecoilState } from 'recoil'
import { lastIDState } from './../../../../recoil/selectors'
import { addDialogState, productsState } from './../../../../recoil/atoms'


import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { HOSTNAME } from '../../../../Constants'



const useStyles = makeStyles({
    numberInputWidth: {
        width: '80px',
        margin: '10px'
    },
    inputMargin: {
        margin: '10px',
    },
    boldFont: {
        fontWeight: 'bold'
    }
})

const AddDialog = (props) => {

    const addDialog= useRecoilValue(addDialogState);
    const resetDialog = useResetRecoilState(addDialogState);
    const setProducts = useSetRecoilState(productsState);

    const { enqueueSnackbar } = useSnackbar();

    const numberReg = new RegExp('[0-9]+')
    const classes = useStyles();

    const lastID = useRecoilValue(lastIDState);

    
    const [dataError, setDataError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [swag_item_id, setSwagItemId] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [swag_name, setSwagItemName] = useState('');
    const [swag_image, setSwagImage] = useState('');
    const [display, setDisplay] = useState(false);
    

    const onSubmit = async () => {
        if (!swag_item_id 
            || !numberReg.test(price) || !numberReg.test(stock)
            || !swag_name
            || !swag_image) 
        {
            setDataError(true);
            return 0;
        }

        setLoading(true);
        setDataError(false);

        try {
            const res = await fetch(HOSTNAME + 'add-swag-item', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    swag_item_id,
                    price,
                    stock,
                    swag_name,
                    swag_image,
                    display
                })
            });
            const data = await res.json();

            if (data.status !== 'SUCCESS') 
                throw new Error('FAILED')

            setProducts(data.swag_items);
            enqueueSnackbar('Succesfully added new Product!', {
                variant: 'success'
            })
            
        } catch(e) {
            enqueueSnackbar('Failed to add new Product!', {
                variant: 'error'
            })
        } finally {
            dialogClose();
        }

    }

    const dialogClose = () => {
        setSwagItemId('');
        setPrice('');
        setStock('');
        setSwagImage('');
        setSwagItemName('');
        setDataError(false);
        setLoading(false);
        resetDialog();
    }

    return(
    <Dialog
        onClose={dialogClose}
        open={addDialog.open}>  
        <DialogTitle color='primary'>
                Add New Product
        </DialogTitle>


        <DialogContent>
            <Grid container direction='column'>
                <Box>
                    <Typography>
                        Product ID should be unique. It can be anything, but it is advised that you set and name your product for your future reference.
                    </Typography>
                    <Typography>
                        Last Product ID: <span className={classes.boldFont}>{lastID}</span>
                    </Typography>
                    <Box hidden={!dataError}>
                        <Typography color='secondary'>Error: Please fill out all fields appropriately before submitting!</Typography>
                    </Box>
                </Box>

                <Grid container direction='row' 
                    wrap='nowrap' spacing={4}
                    alignItems='flex-start' 
                    item>
                    <Grid container direction='column' item xs={9}>
                        <Grid container wrap='nowrap' 
                            alignItems='center' justify='flex-start'>
                            <TextField 
                                value={swag_item_id}
                                error={dataError && !swag_item_id} 
                                onChange={e => setSwagItemId(e.target.value)}
                                className={classes.inputMargin}
                                label='Product ID'>
                            </TextField>

                            <TextField 
                                value={price}
                                error={dataError && !numberReg.test(price)}
                                onChange={e => setPrice(e.target.value)}
                                className={classes.numberInputWidth} 
                                label='PR.' type='number'>
                            </TextField>

                            <TextField
                                value={stock}
                                error={dataError && !numberReg.test(stock)}
                                onChange={e => setStock(e.target.value)} 
                                className={classes.numberInputWidth} 
                                label='STK.' type='number'>
                            </TextField>

                            <FormControlLabel 
                                className={classes.inputMargin}
                                control={<Checkbox
                                    checked={display}
                                    onChange={(e) => setDisplay(e.target.checked)}
                                    />}label='Display'/>
                                
                        </Grid>

        
                        <TextField 
                            value={swag_name}
                            error={dataError && !swag_name}
                            onChange={e => setSwagItemName(e.target.value)}
                            className={classes.inputMargin}
                            label='Product Name' fullWidth>
                        </TextField>


                    </Grid>


                    <Grid item container justify='center' xs={3}>
                        <Box margin='10px' padding='5px' 
                            borderRadius='3px' border='1px solid rgb(199,199,199)'>
                            <Box height='110px' width='110px'>
                                <img src={swag_image} height='110px' width='110px' 
                                alt='No Preview Availble. Please Enter New Link'></img>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <TextField 
                            value={swag_image}
                            error={dataError && !swag_image}
                            onChange={e => setSwagImage(e.target.value)}
                            className={classes.inputMargin}
                            label='Image-Link' fullWidth>
                        </TextField>

                <Grid container direction='row-reverse'>
                    <Button color='secondary'
                        onClick={dialogClose}>
                        Cancel
                    </Button>

                    <div>{ loading ? <CircularProgress/> :
                        <Button color='primary'
                        onClick={onSubmit}>Confirm</Button>
                    }</div>

                </Grid>

            </Grid>
        </DialogContent>

    </Dialog>)

}

export default AddDialog