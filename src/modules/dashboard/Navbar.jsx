import {Avatar, Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography} from '@mui/material';
import {useState} from 'react';
// import moleculeimg from "../../assets/img/group-11.png";
import {NavLink} from 'react-router-dom';
import Logo from '../../assets/svg/logo.svg';
import './NavBar.scss';
import {useAuth} from '../../infrastructure/authentication/useAuth';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settingClick = (cb) => () => {
    handleCloseUserMenu();
    cb();
  }

  const settings = [
    /*{
      name: 'Profile', cb: () => {},
    },*/
    {
      name: 'Logout', cb: logout,
    },
  ];
  return <Box>
    {/* <Box component="div" className="dashboardcircle">
      <Box component="img" alt="image" className="moleculeimg" src={moleculeimg}/>
    </Box> */}
    <Box className="dashboardheader">
      <Grid container spacing={2}>
        <Grid item xs={1} className="logoWrapper">
          <Box component="img" alt="logo" className="logoresponsive"
               src={Logo} />
        </Grid>
        <Grid item xs={10} style={{paddingTop: '25px'}}>
          <nav className="headernavlink">
            <NavLink to="/engine/search">SEARCH ENGINE</NavLink>
            <NavLink to="/dashboard">DRUG INTERACTION</NavLink>
            <NavLink to="/surface">SURFACE</NavLink>
          </nav>
        </Grid>
        <Grid item xs={1}>
          <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt={user.user.name} src={user.user.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              keepMounted
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({name, cb}) => (
                <MenuItem key={name} onClick={settingClick(cb)}>
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Box>;
};
