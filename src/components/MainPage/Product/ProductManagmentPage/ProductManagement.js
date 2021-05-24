import { Container, Paper, Typography, Grid, 
    ButtonGroup, Button, CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil'
import { HOSTNAME } from '../../../../Constants';
import ProductList from './ProductList'
import { productsState, addDialogState } from './../../../../recoil/atoms' 
import { useSnackbar } from 'notistack'
import { Add, Refresh } from '@material-ui/icons';
import AddDialog from './AddDialog'
import EditPicture from './EditPicture';
import ProductPageSelect from './ProductPageSelect';



const ProductManagement = (props) => {
    const [loading, setLoading] = useState(false);

    const [currentItemPage, setCurrentItemPage] = useState(0);

    const setProducts = useSetRecoilState(productsState);
    const setDialog = useSetRecoilState(addDialogState);

    const { enqueueSnackbar } = useSnackbar();

    const fetchProducts = (initial = true) => {
        setLoading(true);
        fetch(HOSTNAME + 'get-list-of-swag-mgmt/')
        .then(res => res.json())
        .then(data => {
           if (data.status === 'SUCCESS')
            {
                if (!initial) enqueueSnackbar('Products List Refreshed', {
                    variant: 'success'
                })
                setProducts(data.swag_items);
            }
            else {
                enqueueSnackbar('Failed to retreive items. Please try again later',
                {
                    variant: 'error',
                })
            }
        }).catch(e => {
            enqueueSnackbar('Connection Error: Please check your internet!',
            {
                variant: 'error',
            })
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(fetchProducts, [setProducts, enqueueSnackbar])


    return (
    <section>
        <AddDialog/>
        <EditPicture/>
        <Container>
            <Paper className='list-paper'>
                <Grid container justify='space-between'
                    wrap='nowrap' alignItems='center'>
                    <Typography color='primary' variant='h5'>
                        Products
                    </Typography>

                    <ProductPageSelect currentItemPage={currentItemPage}
                        setCurrentItemPage={setCurrentItemPage}/>

                    <ButtonGroup variant='text'>
                        <Button color='primary'
                            startIcon={<Add/>}
                            onClick={() => setDialog(oldState => ({...oldState, open: true}))}>
                            Add Item
                        </Button>
                        { loading ? <Button><CircularProgress/></Button> :
                        <Button color='primary'
                            startIcon={<Refresh/>}
                            onClick={() => fetchProducts(false)}>
                            Refresh
                        </Button>
                        }
                    </ButtonGroup>
                </Grid>

                <ProductList loading={loading}
                    currentItemPage={currentItemPage}
                    setCurrentItemPage={setCurrentItemPage}/>
            </Paper>
        </Container>

    </section>)
}

export default ProductManagement;