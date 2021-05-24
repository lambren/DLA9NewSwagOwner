import {  Typography, TableHead, TableContainer, 
    TableCell, TableRow, Table, CircularProgress,
    TextField, makeStyles, TableBody } from '@material-ui/core';
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import ProductItem from './ProductItem/ProductItem'
import { productsSearchState } from './../../../../recoil/atoms'
import { filteredProductsState } from './../../../../recoil/selectors'
import {NUM_OF_PRODUCTS_EACH_PAGE} from './../../../../Constants'



const useStyles = makeStyles({
    heightLimit: {
        display: 'flex',
        height: '95%',
        justifyContent: 'center', 
        alignItems: 'center'
    }
})


const ProductList = (props) => {
    const classes = useStyles();

    const { loading, currentItemPage, setCurrentItemPage } = props;

    const allProducts = useRecoilValue(filteredProductsState);

    const setSearch = useSetRecoilState(productsSearchState);

    return (
        <div className={classes.heightLimit}>{
            loading ? <CircularProgress/> :
            <TableContainer className='table-container'>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TextField label='ID'
                                variant='standard'
                                onChange={e => {
                                    setCurrentItemPage(0);
                                    setSearch(oldSearch => ({...oldSearch, swagIDSearch: e.target.value}))
                                }}>
                            </TextField>
                        </TableCell>

                        <TableCell>
                            <Typography>
                                Image
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <TextField label='Name'
                                variant='standard'
                                onChange={e =>{
                                    setCurrentItemPage(0);
                                    setSearch(oldSearch => ({...oldSearch, swagNameSearch: e.target.value}))
                                }}>
                            </TextField>
                        </TableCell>

                        <TableCell>
                            <Typography>Price</Typography>
                        </TableCell>

                        <TableCell>
                            <Typography>Stock</Typography>
                        </TableCell>

                        <TableCell>
                            <Typography>Display</Typography>
                        </TableCell>

                        <TableCell>
                        </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                {allProducts
                    .slice(
                        currentItemPage*NUM_OF_PRODUCTS_EACH_PAGE, 
                        (currentItemPage + 1)*NUM_OF_PRODUCTS_EACH_PAGE)
                    .map(item => 
                    <ProductItem item={item} key={item.swag_item_id}/>
                )}
                </TableBody>
            </Table>
        </TableContainer>
        }</div>
    )
}

export default ProductList;