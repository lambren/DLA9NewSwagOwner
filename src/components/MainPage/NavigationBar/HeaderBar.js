import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavigationDrawer from './NavigationDrawer';
import { Route, Switch } from 'react-router-dom'
import { Pages } from './../Pages'

export default function HeaderBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <NavigationDrawer/>
            <Switch>
              {Pages.map(item => 
                <Route 
                  key={item.path}
                  path={item.path}>
                  <Typography variant='h6'>
                    {item.title}
                  </Typography>
                </Route>
                )}
            </Switch>
        </Toolbar>
      </AppBar>
    </div>
  );
}