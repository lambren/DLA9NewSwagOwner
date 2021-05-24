import React  from 'react'
import { TableBody, TableCell, TableRow, Button}  from '@material-ui/core';

const AllOrdersItem = (props) => {
    const { item } = props;

    const chooseStyle = () => {
        switch(item.status)
        {
            case 'FULFILLED':
                return { color: '#5d5fde' }
            case 'BACKORDERED':
                return { color: '#dae069'}
            case 'CANCELLED':
                return { color: '#db5030'}
            case 'DELIVERED':
                return { color: '#31b03c'}
            case 'RECEIVED':
                return { color: '#c92a9f' }
            default:
                return {}
        }
    }

    const timeStamp = new Date(item.delivery_time)

    return( 
        <TableBody>
            <TableRow>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.user_first_name}</TableCell>
                <TableCell>{item.user_manager}</TableCell>
                <TableCell>{item.swag_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                    
                    <Button variant='text' style={chooseStyle()}>
                        {item.status}
                    </Button>
                </TableCell>
                <TableCell>{item.delivery_time ? timeStamp.toLocaleString(): ''}</TableCell>
            </TableRow>
        </TableBody>
    )
}

export default AllOrdersItem;