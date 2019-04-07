import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core/';
import {Home, ExitToApp, Accessibility, Autorenew, ArrowRight} from '@material-ui/icons/';

const Nav = (props) => {
  return (
      <nav>
        <List>
          <ListItem button component={Link} to="/home">
             <ListItemIcon>
                <Home />
             </ListItemIcon>
              <ListItemText primary='Home' />

          </ListItem>
          {props.checkLogin() &&
          <React.Fragment>
              <ListItem button component={Link} to="/profile">
                  <ListItemIcon>
                      <Accessibility />
                  </ListItemIcon>
                  <ListItemText primary='profile' />

              </ListItem>
              <ListItem button component={Link} to="logout">
                  <ListItemIcon>
                      <Autorenew />
                  </ListItemIcon>
                  <ListItemText primary='logout' />

              </ListItem>
          </React.Fragment>
          }
          {!props.checkLogin() &&
          <ListItem button component={Link} to="/">
              <ListItemIcon>
                  <ArrowRight />
              </ListItemIcon>
              <ListItemText primary='Login' />

          </ListItem>
          }

        </List>
      </nav>
  );
};

Nav.propTypes = {
  checkLogin: PropTypes.func,
};

export default Nav;