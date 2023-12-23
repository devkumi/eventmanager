import React, {useEffect, useState} from 'react'
import { Outlet, Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import Sidebar from '../conponent/Sidebar';
import { AppBar, Box, Breadcrumbs, Button, CssBaseline, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { SET_MENU, drawerWidth } from '../global/variables';

// import { IconChevronRight } from '@tabler/icons';
// import menuItems from '../conponent/menu-items';



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px'
  }
}));


export const Layout = () => {


  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();

  const handleLogout = async () => {

    reactLocalStorage.set('login', false);
    navigate('/login');
    // console.log('Logout');
  };

  const login = reactLocalStorage.get('login');
  useEffect(() => {
    // console.log(login)
    if (login === undefined || login === "false") {
      handleLogout()
    }
  });



  // const leftDrawerOpened = useSelector((state) => state.customization.opened);




  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav> */}
      
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      
      
      {/* drawer */}
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
      <AppBar color="" enableColorOnDark position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test
          </Typography>
          <Button color="inherit">Disabled</Button>
        </Toolbar>
      </AppBar>
      <Box marginLeft={5} marginRight={5} marginTop={15}  theme={theme} >
        {/* breadcrumb */}
        <Outlet   />
      </Box>
    </Box>
      {/* <Outlet marginLeft={30} /> */}
      {/* main content */}
      
      {/* <Customization /> */}
    </Box>
      
    </>
  )
}
