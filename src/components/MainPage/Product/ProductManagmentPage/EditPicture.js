import { Dialog, DialogContent, DialogTitle, Grid, 
    TextField, Box, 
    makeStyles, 
    Button,
    CircularProgress} from '@material-ui/core';
import React, { useState } from 'react'
import { editPictureDialogState, productsState } from './../../../../recoil/atoms';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { ArrowRight } from '@material-ui/icons';
import { HOSTNAME } from '../../../../Constants';
import { useSnackbar } from 'notistack'

const useStyles = makeStyles({
    imageBox : {
        margin:'10px',
        padding: '10px',
        border:'1px solid rgb(199,199,199)',
        borderRadius:'3px',
    },
    inputMargin: {
        marginTop: '10px',
        marginBottom: '10px',
    }
})

const EditPicture = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const setProducts = useSetRecoilState(productsState);

    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const editPictureDialog 
        = useRecoilValue(editPictureDialogState);

    const {open, swag_item_id, swag_name, currentPictureLink} 
        = editPictureDialog;

    const resetEdiPictureDialog 
        = useResetRecoilState(editPictureDialogState);

    const [newPicture, setNewPicture] = useState('');

    const onSubmit = async () => {
        if (!newPicture) {
            setError(true);
            return 0;
        }

        setLoading(true);
        
        try {
            const res = await fetch(HOSTNAME + 'edit-picture', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    swag_item_id, newPicture
                })
            })
            const data = await res.json();
            if (data.status === 'SUCCESS')
            {
                enqueueSnackbar('Successfully changed picture!', {
                    variant: 'success'
                });
                setProducts(data.swag_items);
                handleClose();
            }
            else throw new Error('EDIT FAILED');
        } catch (e) {
            console.log(e);
            enqueueSnackbar('Failed to change picture!', {
                variant: 'error'
            })
            handleClose();
        }
    }

    const handleClose = () => {
        setLoading(false);
        setError(false);
        resetEdiPictureDialog();
    }

    return (
    <Dialog open={open}
        onClose={handleClose}>
        <DialogTitle>
            {swag_item_id}
            :&nbsp;
            {swag_name}
        </DialogTitle>
        <DialogContent>
            <Grid container wrap='nowrap' alignItems='center' justify='center'>
                <Box className={classes.imageBox}>
                    <Box width='200px' height='200px'>
                        <img src={currentPictureLink} height='200px' width='200px'
                        alt='Preview Not Available.'>
                        </img>
                    </Box>
                </Box>

                <ArrowRight fontSize='large'/>
                
                <Box className={classes.imageBox}>
                    <Box width='200px' height='200px'>
                        <img src={newPicture} height='200px' width='200px'
                        alt='Preview Not Available. Please input New Link to Preview'>
                        </img>
                    </Box>
                </Box>
            </Grid>

            <TextField value={newPicture} fullWidth
                className={classes.inputMargin}
                onChange={e => setNewPicture(e.target.value)}
                error={error && !newPicture}
                label='New Image Link'>   
            </TextField>

            <Grid container direction='row-reverse'>
                <Button color='secondary'
                    onClick={handleClose}>Cancel</Button>
                { loading ? <CircularProgress/> :
                <Button color='primary'
                    onClick={onSubmit}>Apply</Button>
                }

            </Grid>
        </DialogContent>
    </Dialog>
    )
}

export default EditPicture;