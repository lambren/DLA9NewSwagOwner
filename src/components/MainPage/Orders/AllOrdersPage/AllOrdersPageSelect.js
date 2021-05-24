import React from 'react';
import { useRecoilValue } from 'recoil'
import { numOfAllOrdersPagesState } from './../../../../recoil/selectors'
import { Typography, Grid, IconButton,
    TextField, makeStyles } 
    from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

const useStyles = makeStyles({
    numberInputWidth: {
        width: '80px',
    },
    gridMargin: {
        marginBottom: '5px',
    },

})

const AllOrdersPageSelect = (props) => {
    const classes = useStyles();
    const { currentItemPage, setCurrentItemPage } = props
    const MAX_PAGE = useRecoilValue(numOfAllOrdersPagesState);

    return (
        <Grid item container alignItems='center' 
            justify='flex-start' xs={8} wrap='nowrap'>
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
                    if (parseInt(e.target.value) >= MAX_PAGE)
                        return setCurrentItemPage(MAX_PAGE);
                    else return setCurrentItemPage(parseInt(e.target.value))
                }}>
            </TextField>

            <Typography>&nbsp;{MAX_PAGE} </Typography>
            <IconButton
                onClick={() => 
                    setCurrentItemPage(oldItemPage => {
                        if (oldItemPage < MAX_PAGE)
                            return oldItemPage + 1;

                        return oldItemPage;
                })}>
                <Add/>
            </IconButton>
        </Grid>
    )

}

export default AllOrdersPageSelect;