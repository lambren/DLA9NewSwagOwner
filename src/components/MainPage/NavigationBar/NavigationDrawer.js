import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from 'react-router-dom'
import { Pages } from './../Pages'
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  navButton: {
    color: 'black',
    textDecoration: 'none',
  }
});


export default function NavigationDrawer() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (state) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer(state);
  };

  const list = (anchor = 'left') => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {Pages.slice(0,3).map(item => 
          <Link 
            key={item.path}
            to={item.path} 
            className={classes.navButton}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title}/>
            </ListItem>
          </Link>
        )}
      </List>
      <Divider />

      <List>
        {Pages.slice(3,4).map(item => 
          <Link 
            key={item.path}
            to={item.path} 
            className={classes.navButton}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title}/>
            </ListItem>
          </Link>
        )}
      </List>
      <Divider />

      <List>
      {Pages.slice(4,7).map(item => 
          <Link 
            key={item.path}
            to={item.path} 
            className={classes.navButton}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title}/>
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment>
          <IconButton color='inherit' onClick={toggleDrawer(true)}>
              <MenuIcon/>
          </IconButton>
          <Drawer anchor='left' open={openDrawer} onClose={toggleDrawer(false)}>
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}