import React from 'react';

import { makeStyles,
    Typography, Grid, IconButton, 
    TextField } 
    from '@material-ui/core';
import { Add,  Remove } from '@material-ui/icons';

import { numOfProductsPagesState } from './../../../../recoil/selectors'
import { useRecoilValue } from 'recoil'
 
const useStyles = makeStyles({
    numberInputWidth: {
        width: '80px',
    },
    gridMargin: {
        marginBottom: '5px',
    },

})


const ProductPageSelect = (props) => {
    const classes = useStyles();
    const {currentItemPage, setCurrentItemPage } = props;

    const numOfPage = useRecoilValue(numOfProductsPagesState);

    return (
    <Grid container alignItems='center' 
        justify='flex-start' wrap='nowrap' xs={4}>
    <IconButton
        onClick={() => 
            setCurrentItemPage(oldItemPage => {
            if (oldItemPage > 0)
                return oldItemPage - 1;
            
            return oldItemPage;
        })}>
        <Remove/>
    </IconButton>

    <TextField 
        size='small'
        variant='outlined'
        className={classes.numberInputWidth}
        value={currentItemPage}
        type='number'
        onChange={e => {
            if (!e.target.value) return setCurrentItemPage(0);
            if (parseInt(e.target.value) < 0) 
                return setCurrentItemPage(0);
            if (parseInt(e.target.value) >= numOfPage)
                return setCurrentItemPage(numOfPage);
            else return setCurrentItemPage(parseInt(e.target.value))
        }}>
    </TextField>

    <Typography>&nbsp;{numOfPage} </Typography>
    <IconButton
        onClick={() => 
            setCurrentItemPage(oldItemPage => {
                if (oldItemPage < numOfPage)
                    return oldItemPage + 1;
                
                return oldItemPage;
        })}>
        <Add/>
    </IconButton>
    </Grid>
    )
}

export default ProductPageSelect