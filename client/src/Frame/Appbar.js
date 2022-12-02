import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import { UsernameContext } from '../UsernameConetxt';
import LoginMenuItem from './LoginMenuItem';


export default function Appbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);

  const { username, setUsername } = useContext(UsernameContext)
  const navigate = useNavigate();

  let link = "/" + username + "/Search/" + search
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => { setLoginOpen(false); console.log(typeof (loginOpen)) }

  const menuId = 'primary-search-account-menu';



  return (
    <div>

      <Box sx={{ flexGrow: 1 }}>

        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              MUI
            </Typography>
            <div>
              <TextField variant="outlined" placeholder='Search' onChange={e => { setSearch(e.target.value); }} value={search} style={{ background: "white" }} size="small"></TextField>
              <Button variant='contained' onClick={() => { navigate(link) }}>Search</Button>
            </div>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex' }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />{/*When you render the app bar position fixed, the dimension of the element doesn't impact the rest of the page. This can cause some part of your content to be invisible, behind the app bar. */}
        <Menu
          anchorEl={anchorEl/*the pop over menu */}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}

          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {
            username ?
              <div>
                <MenuItem onClick={handleMenuClose}>{"My account " + username}</MenuItem>
                <MenuItem onClick={()=>{handleMenuClose();setUsername(null);/*if not auto open login box after sign out setLoginOpen(false)*/}}>Sign out</MenuItem>
              </div>
              :
              <div>
                <MenuItem onClick={() => { handleMenuClose(); setLoginOpen(true); }}>Login</MenuItem>
                <LoginMenuItem loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
              </div>
          }
        </Menu>

      </Box>
    </div>
  );
}


/*

const Toolbar=()=> {
  
    return(
        <nav className="toolBar">
        <a href="./Settings" ><img src={settingsIcon} className="settings-icon" alt="" /> </a>
        <a href="/">Home</a>
        <a href="./Register">Register</a>
        <a href="./About-Us">About-Us</a>
      </nav>
    )
}
export default Toolbar;
*/