import React from 'react'

import { IconButton, ButtonGroup, Box, 
    Typography, makeStyles } from '@material-ui/core';

import DoneAllIcon from '@material-ui/icons/DoneAll';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
    boldText: {
        fontWeight: 'bold'
    }
})

const ConfirmationButton =(props) => {
    const classes = useStyles();

    const { setConfirmation, toExecute, 
        confirmationTitle } = props;

    const chooseColor = () => {
        switch(confirmationTitle)
        {
            case 'Confirm Edit':
            case 'Confirm Fulfillment':
                return ({
                    color: "#2328b8"
                })
            case 'Confirm Backlog':
                return({
                    color: "#d1c50a"
                })
            case 'Confirm Removal':
            case 'Confirm Cancellation':
                return({
                    color: "#e3281b"
                })
            default: 
                return({
                    color: 'black'
                })
        }
    }

    return(
        <Box>
            <Typography   
                className={classes.boldText}
                style={chooseColor()}>
                {confirmationTitle.slice(8)}
            </Typography>

            <ButtonGroup>
                <IconButton 
                    size='small'
                    color='primary' 
                    title={confirmationTitle}
                    onClick={() => {
                        setConfirmation(false);
                        toExecute();
                    }}>
                    <DoneAllIcon/>
                </IconButton>

                <IconButton
                    size='small'
                    color='secondary' 
                    title='Back'
                    onClick={() => setConfirmation(false)}>
                    <CancelIcon/>
                </IconButton>
            </ButtonGroup>
        </Box>
    )
}

export default ConfirmationButton;