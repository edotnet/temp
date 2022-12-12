import { Add } from '@mui/icons-material';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Menu, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
// import moleculeimg from "../../assets/img/group-11.png";
import { NavLink, useNavigate } from 'react-router-dom';
import GlobalResponse from '../../assets/img/graidicon.png';
import Logo from '../../assets/svg/logo.svg';
import { useAuth } from '../../infrastructure/authentication/useAuth';
import { Session } from "../../infrastructure/session/Session";
import './NavBar.scss';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false)
  const [profile, setProfile] = useState(user.user)

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
               src={Logo} />
        </Grid>
        <Grid item xs={7} style={{paddingTop: '25px'}}>
          <nav className="headernavlink">
            <NavLink to="/engine">SEARCH ENGINE</NavLink>
            <NavLink to="/dashboard">DRUG INTERACTION</NavLink>
            <NavLink to="/tools">TOOLS</NavLink>
            <NavLink to="/globalresponse">
              <img src={GlobalResponse} width={10} height={10} style={{ marginTop: '-5px', marginRight: 20, transform:'scale(3.5)'}} />
              GLOBAL RESPONSE AID
            </NavLink>
            {/*<NavLink to="/surface">SURFACE</NavLink>*/}
          </nav>
        </Grid>
        <Grid flexGrow={1} item sx={{display: 'flex', justifyContent: 'right', alignContent: 'center', alignItems: 'center'}}>
          <Session />
        </Grid>
        <Grid item>
          <Box sx={{ flexGrow: 0, justifyContent: 'flex-end', display: 'flex', pr: 3 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt={user.user.name} src={user.user.image} />
              </IconButton>
            </Tooltip>
            <Dialog
              open={openProfile}
              onClose={() => setOpenProfile(false)}
              scroll='body'
              fullWidth={true}
              maxWidth='md'>
              <DialogTitle id="scroll-dialog-title">Profile Settings</DialogTitle>
              <DialogContent dividers={false}>
                <div style={{ display: 'flex' }}>
                  <div style={{ padding: '0 50px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '60%' }}>
                    <label htmlFor='change-photo'>
                      <Tooltip title='Upload Photo'>
                        <div style={{ width: 100, height: 100, borderRadius: '50%', margin: '0 auto 10px auto', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
                          {/* <img src='https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png' alt='' style={{width: '100%', height: '100%', objectFit: 'cover'}} /> */}
                          <input hidden accept="image/*" type="file" id='change-photo' />
                          <Avatar sx={{ width: '100%', height: '100%' }} />
                          <div style={{position:'absolute', width: '50%', height: '100%', background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)', zIndex: 2, right: 0, bottom: 0, display: 'flex'}}>
                            <Add fontSize='large' sx={{ m: 'auto', mr: 0.4, color:'#f8f8f8' }} />
                          </div>
                        </div>
                      </Tooltip>
                    </label>
                    <Typography fontWeight={700} fontSize={22} textOverflow='ellipsis' overflow='hidden'>{profile.name}</Typography>
                    <Typography textOverflow='ellipsis' overflow='hidden'>{profile.email}</Typography>
                    <Typography fontSize={12} textOverflow='ellipsis' overflow='hidden'>{profile.phoneNumber || ''}</Typography>
                    <Typography fontSize={10}>CLIENT_ID: {profile.id}</Typography>
                  </div>
                  <div style={{ height: 450, width: 1, backgroundColor: '#666' }}></div>
                  <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography fontSize={20} fontWeight={700}>Change Profile Information</Typography>
                    <TextField variant='filled' size='small' label='User Name' value={profile.name || ''} onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))} />
                    <TextField variant='filled' size='small' label='Company or Institution' value={profile.companyOrInstitution || ''} onChange={e => setProfile(prev => ({ ...prev, companyOrInstitution: e.target.value }))} />
                    <TextField variant='filled' size='small' label='Email' value={profile.email || ''} onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))} />
                    <TextField variant='filled' size='small' label='Phone Number' value={profile.phoneNumber || ''} onChange={e => setProfile(prev => ({ ...prev, phoneNumber: e.target.value }))} />
                    <TextField variant='filled' size='small' label='Date of birth' value={profile.dateOfBirth || ''} onChange={e => setProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))} />
                    <TextField variant='filled' size='small' label='Nationality' value={profile.nationality || ''} onChange={e => setProfile(prev => ({ ...prev, nationality: e.target.value }))} />
                    <TextField variant='filled' size='small' label='Passport No.' value={profile.passport || ''} onChange={e => setProfile(prev => ({ ...prev, passport: e.target.value }))} />
                    {/* <TextField variant='filled' label='Shoed size' value={profile.shoedSize || ''} onChange={e => setProfile(prev => ({ ...prev, shoedSize: e.target.value }))} /> */}
                    <Button variant="contained" component="label">
                    Upload Government ID or Passport
                      <input hidden accept="image/*" type="file" />
                    </Button>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenProfile(false)}>Cancel</Button>
                <Button onClick={() => setOpenProfile(false)}>Save</Button>
              </DialogActions>
            </Dialog>
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
