import React, {useState}  from 'react'
import { TableCell, TableRow, TextField,
     makeStyles, Box, ClickAwayListener
    }  from '@material-ui/core';

import DisplaySwitch from './DisplaySwitch';
import { useSetRecoilState } from 'recoil';
import { editPictureDialogState } from '../../../../../recoil/atoms'
import EditButtons from './EditButtons';

const useStyles = makeStyles({
    numberInputWidth:  {
        maxWidth: '80px'
    }
})

const ProductItem = (props) => {

    const { item } = props;
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [newSwag_name, setNewSwagName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newStock, setNewStock] = useState('');

    const setEditPicture = useSetRecoilState(editPictureDialogState);

    return( 
        <ClickAwayListener onClickAway={() => setEditMode(false)}>
        <TableRow> 
            <TableCell>{item.swag_item_id}</TableCell>
            { editMode ?  
            [
                <TableCell>
                    <button className='picture-edit-button'
                        onClick={() => {
                            setEditPicture({
                                open: true,
                                swag_item_id : item.swag_item_id,
                                currentPictureLink : item.swag_image,
                                swag_name: item.swag_name,
                            })
                        }}>
                        <Box height='50px' width='50px'>
                            <img height='50px' width='50px' src={item.swag_image} alt='N/A'></img>
                        </Box>
                    </button>
                </TableCell>,
                <TableCell>
                    <TextField 
                        fullWidth 
                        value={newSwag_name}
                        label={item.swag_name ? item.swag_name : ''}
                        onChange={e => setNewSwagName(e.target.value)}/>
                </TableCell>,
                <TableCell>
                    <TextField 
                        value={newPrice}
                        label={item.price ? item.price : '0'} 
                        type='number' className={classes.numberInputWidth}
                        onChange={e => setNewPrice(e.target.value)}/>
                </TableCell>,

                <TableCell>
                    <TextField
                        value={newStock} 
                        label={item.stock ? item.stock : '0'}
                        type='number' className={classes.numberInputWidth}
                        onChange={e => setNewStock(e.target.value)}/>
                </TableCell>,
            ]
            : [
                <TableCell>
                    <button className='picture-edit-button'
                        onClick={() => {
                            setEditPicture({
                                open: true,
                                swag_item_id : item.swag_item_id,
                                currentPictureLink : item.swag_image,
                                swag_name: item.swag_name,
                            })
                        }}>
                        <Box height='50px' width='50px'>
                            <img height='50px' width='50px' src={item.swag_image} alt='N/A'></img>
                        </Box>
                    </button>
                </TableCell>,
                <TableCell>{item.swag_name}</TableCell>,
                <TableCell>{item.price}</TableCell>,
                <TableCell>{item.stock}</TableCell>,
            ] 
            }
            <TableCell>
                <DisplaySwitch display={item.display} swag_item_id={item.swag_item_id}>
                </DisplaySwitch>
            </TableCell>
            <TableCell>
                <EditButtons 
                    loading={loading} setLoading={setLoading}
                    editMode={editMode} setEditMode={setEditMode}
                    swag_item_id={item.swag_item_id}
                    swag_name={newSwag_name} 
                    setSwag_name={setNewSwagName}
                    price={newPrice} setPrice={setNewPrice}
                    stock={newStock} setStock={setNewStock}/>
            </TableCell>
        </TableRow>
        </ClickAwayListener>
    )
}

export default ProductItem