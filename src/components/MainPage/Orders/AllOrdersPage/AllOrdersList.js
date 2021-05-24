import {  Typography, TableHead, TableContainer, 
    TableCell, TableRow, Table, 
    TextField, withWidth } from '@material-ui/core';
import React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import AllOrdersItem from './AllOrdersItem'
import { filteredAllOrdersState } from './../../../../recoil/selectors'
import { allOrdersSearchState } from './../../../../recoil/atoms'
import { NUM_OF_ORDERS_EACH_PAGE } from './../../../../Constants'



const AllOrdersList = (props) => {
    const { setCurrentItemPage } = props;

    const allOrders = useRecoilValue(filteredAllOrdersState);
    const [search, setSearch]= useRecoilState(allOrdersSearchState);

    const { currentItemPage } = props;

    return (
        <div style={{height: props.width === 'xs'? '90%' : '97%'}}>
            <TableContainer className='table-container'>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TextField label='Login'
                                value={search.loginSearch}
                                variant='standard'
                                onChange={e => {
                                    setSearch(search => 
                                        ({...search, loginSearch: e.target.value}));
                                    setCurrentItemPage(0);
                                }}>
                            </TextField>
                        </TableCell>

                        <TableCell>
                            <TextField label='Name'
                                value={search.nameSearch}
                                variant='standard'
                                onChange={e => { 
                                    setSearch(search => 
                                        ({...search, nameSearch: e.target.value}));
                                    setCurrentItemPage(0);
                                }}>
                            </TextField>
                        </TableCell>

                        <TableCell>
                            <TextField label='Manager'
                                value={search.managerSearch}
                                variant='standard'
                                onChange={e => {
                                    setSearch(search => 
                                        ({...search, managerSearch: e.target.value}));
                                    setCurrentItemPage(0);
                                }}>
                            </TextField>
                        </TableCell>

                        <TableCell>
                            <TextField label='Item'
                                value={search.itemSearch}
                                variant='standard'
                                onChange={e => {
                                    setSearch(search => 
                                        ({...search, itemSearch: e.target.value}))
                                    setCurrentItemPage(0);
                                }}>
                            </TextField>
                        </TableCell>

                        <TableCell>
                            <Typography>Qty</Typography>
                        </TableCell>

                        <TableCell>
                            <Typography>Status</Typography>
                        </TableCell>

                        <TableCell>
                            <Typography>Delivery</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {allOrders
                    .slice(
                        currentItemPage*NUM_OF_ORDERS_EACH_PAGE, 
                        (currentItemPage + 1)*NUM_OF_ORDERS_EACH_PAGE)
                    .map(item => 
                    <AllOrdersItem item={item} key={item.cart_id}/>
                )}
            </Table>
        </TableContainer>
        </div>
    )
}

export default withWidth()(AllOrdersList);