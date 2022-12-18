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
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom'
import { Button, Drawer, TextField, Tooltip } from '@mui/material';
import { UsernameContext } from '../UsernameConetxt';
import LoginMenuItem from './LoginMenuItem';
import BookIcon from '@mui/icons-material/Book';
import CollectionsIcon from '@mui/icons-material/Collections';


export default function Appbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { username, setUsername } = useContext(UsernameContext)
  const navigate = useNavigate();

  let link = "/" + username + "/Search/" + search
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
              onClick={() => { setDrawerOpen(!drawerOpen) }}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box p={2} width="250px" textAlign="center" role="presentation">
                <Typography>hi</Typography>
              </Box>
            </Drawer>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}>
              BlogSite
            </Typography>
            <div>
              <TextField variant="outlined" placeholder='Search' onChange={e => { setSearch(e.target.value); }} value={search} style={{ background: "white" }} size="small"></TextField>
              <Button variant='contained' onClick={() => { if (search != "") navigate(link) }}>Search</Button>
            </div>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex' }}>
              {username &&
                <div>
                  <Tooltip title="My images">
                    <IconButton size="large" color="inherit" onClick={() => { navigate(`./${username}/Images`); }}>
                      <CollectionsIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="My blogs">
                    <IconButton size="large" color="inherit" onClick={() => { navigate(`./${username}/Main`); }}>
                      <BookIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Notifications">
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit">
                      <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                </div>
              }
              <Tooltip title="Profile">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit">
                  <AccountCircle />
                </IconButton>
              </Tooltip>
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
          onClose={handleMenuClose}>
          {
            username ?
              <div>
                <MenuItem onClick={handleMenuClose}>{"My account " + username}</MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); setUsername(null);/*if not auto open login box after sign out setLoginOpen(false)*/ }}>Sign out</MenuItem>
              </div>
              :
              <div>
                <MenuItem onClick={() => { handleMenuClose(); setLoginOpen(true); }}>Login</MenuItem>
                <LoginMenuItem loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
                <MenuItem onClick={() => { handleMenuClose();navigate('../Register') }}>Register</MenuItem>
              </div>
          }
        </Menu>
      </Box>
    </div>
  );
}


