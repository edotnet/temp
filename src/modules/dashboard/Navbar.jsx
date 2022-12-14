import {Avatar, Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography} from '@mui/material';
import {useState} from 'react';
// import moleculeimg from "../../assets/img/group-11.png";
import {NavLink} from 'react-router-dom';
import GlobalResponse from '../../assets/img/graidicon.png';
import Logo from '../../assets/svg/logo.svg';
import {useAuth} from '../../infrastructure/authentication/useAuth';
import {Session} from "../../infrastructure/session/Session";
import './NavBar.scss';
import {Profile} from "../profile/Profile";

export const Navbar = () => {
  const {user, logout} = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false)

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
    {
      name: 'Profile', cb: () => setOpenProfile(true),
    },
    {
      name: 'Logout', cb: logout,
    },
  ];
  return <Box>
    {/* <Box component="div" className="dashboardcircle">
      <Box component="img" alt="image" className="moleculeimg" src={moleculeimg}/>
    </Box> */}
    <Box bgcolor='white' className="dashboardheader">
      <Grid container spacing={2} wrap={'nowrap'}>
        <Grid item xs={1} className="logoWrapper">
          <Box component="img" alt="logo" className="logoresponsive"
               src={Logo}/>
        </Grid>
        <Grid item xs={7} style={{paddingTop: '25px'}}>
          <nav className="headernavlink">
            <NavLink to="/engine">SEARCH ENGINE</NavLink>
            <NavLink to="/dashboard">DRUG INTERACTION</NavLink>
            <NavLink to="/tools">TOOLS</NavLink>
            <NavLink to="/globalresponse">
              <img src={GlobalResponse} width={10} height={10}
                   style={{marginTop: '-5px', marginRight: 20, transform: 'scale(3.5)'}}/>
              GLOBAL RESPONSE AID
            </NavLink>
            {/*<NavLink to="/surface">SURFACE</NavLink>*/}
          </nav>
        </Grid>
        <Grid flexGrow={1} item
              sx={{display: 'flex', justifyContent: 'right', alignContent: 'center', alignItems: 'center'}}>
          <Session/>
        </Grid>
        <Grid item>
          <Box sx={{flexGrow: 0, justifyContent: 'flex-end', display: 'flex', pr: 3}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt={user.user.name} src={user.user.image}/>
              </IconButton>
            </Tooltip>
            <Profile open={openProfile} onClose={() => setOpenProfile(false)}/>
            <Menu
              sx={{mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              keepMounted
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
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
