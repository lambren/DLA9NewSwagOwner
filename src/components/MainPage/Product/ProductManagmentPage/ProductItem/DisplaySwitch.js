import  React, {useState}  from 'react'
import Switch from '@material-ui/core/Switch'
import { useSnackbar } from 'notistack'
import { HOSTNAME } from '../../../../../Constants'
import { productsState } from '../../../../../recoil/atoms'
import { useSetRecoilState } from 'recoil'

const DisplaySwitch = (props) => {
    const { display, swag_item_id } = props;
    const { enqueueSnackbar } = useSnackbar();

    const [switchState, setSwitchState] = useState(display);
    const setProducts = useSetRecoilState(productsState);

    const displayChange = async () => {
        setSwitchState(oldState => !oldState)
        try{
            const res = await fetch(HOSTNAME + 'toggle-display', {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    swag_item_id,
                    newDisplay: !display,
                })
            })

            const data = await res.json();

            if (data.status === 'SUCCESS') {
                setSwitchState(data.swag_items.find(item => item.swag_item_id === swag_item_id).display);
                setProducts(data.swag_items);
            } else {
                throw new Error('FAILED');
            }
        } catch (e) {
            setSwitchState(display);
            enqueueSnackbar('Failed to toggle display! Please check your Internet connection' ,{
                variant: 'error'
            });
        }
    }

    return(<div>
        <Switch checked={switchState}
            onChange={displayChange}
            color='primary'></Switch>
    </div>)
}

export default DisplaySwitch;