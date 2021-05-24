import { useHistory } from 'react-router-dom'
import React from 'react'
import { Button, Paper, Typography } from '@material-ui/core';



const SignIn = (props) => {
    const history = useHistory();
  
    const { setLogin } = props;
    const signIn = () => {
      setLogin(true);
      history.replace('/home/order-fulfillment');
    }
  
    return(
      <section style={{
        justifyContent:'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Paper style={{
          padding: '3em',
          margin: '3em',
        }}>

          <Typography variant='h5' color='inherit'>
            SIGN-IN with username and password will be implemented later
          </Typography>

          <Button onClick={signIn} variant='contained' color='primary'>
            JUST SIGN IN
          </Button>
        </Paper>
      </section>
    )
}

export default SignIn;
  