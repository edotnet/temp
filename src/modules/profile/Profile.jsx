import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip, Typography} from "@mui/material";
import AvatarImg from "../../assets/svg/avatar.svg";
import {Add} from "@mui/icons-material";
import {useState} from "react";
import {useAuth} from "../../infrastructure/authentication/useAuth";

export const Profile = ({open, onClose}) => {
  const {user} = useAuth();
  const [profile, setProfile] = useState(user.user)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll='body'
      fullWidth={true}
      maxWidth='md'>
      <DialogTitle id="scroll-dialog-title">Profile Settings</DialogTitle>
      <DialogContent dividers={false}>
        <div style={{display: 'flex'}}>
          <div style={{
            padding: '0 50px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '60%'
          }}>
            <label htmlFor='change-photo'>
              <Tooltip title='Upload Photo'>
                <div style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  margin: '0 auto 10px auto',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer'
                }}>
                  {/* <img src='https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png' alt='' style={{width: '100%', height: '100%', objectFit: 'cover'}} /> */}
                  <input hidden accept="image/*" type="file" id='change-photo'/>
                  <img src={AvatarImg} style={{width: '100%', height: '100%', objectFit: 'contain'}} alt="avatar"/>
                  <div style={{
                    position: 'absolute',
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)',
                    zIndex: 2,
                    right: 0,
                    bottom: 0,
                    display: 'flex'
                  }}>
                    <Add fontSize='large' sx={{m: 'auto', mr: 0.4, color: '#f8f8f8'}}/>
                  </div>
                </div>
              </Tooltip>
            </label>
            <Typography fontWeight={700} fontSize={22} textOverflow='ellipsis'
                        overflow='hidden'>{profile.name}</Typography>
            <Typography textOverflow='ellipsis' overflow='hidden'>{profile.email}</Typography>
            <Typography fontSize={12} textOverflow='ellipsis' overflow='hidden'>{profile.phoneNumber || ''}</Typography>
            <Typography fontSize={10}>CLIENT_ID: {profile.id}</Typography>
          </div>
          <div style={{height: 450, width: 1, backgroundColor: '#666'}}></div>
          <div style={{
            flex: 1,
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <Typography fontSize={20} fontWeight={700}>Change Profile Information</Typography>
            <TextField variant='filled' size='small' label='User Name' value={profile.name || ''}
                       onChange={e => setProfile(prev => ({...prev, name: e.target.value}))}/>
            <TextField variant='filled' size='small' label='Company or Institution'
                       value={profile.companyOrInstitution || ''}
                       onChange={e => setProfile(prev => ({...prev, companyOrInstitution: e.target.value}))}/>
            <TextField variant='filled' size='small' label='Email' value={profile.email || ''}
                       onChange={e => setProfile(prev => ({...prev, email: e.target.value}))}/>
            <TextField variant='filled' size='small' label='Phone Number' value={profile.phoneNumber || ''}
                       onChange={e => setProfile(prev => ({...prev, phoneNumber: e.target.value}))}/>
            <TextField variant='filled' size='small' label='Date of birth' value={profile.dateOfBirth || ''}
                       onChange={e => setProfile(prev => ({...prev, dateOfBirth: e.target.value}))}/>
            <TextField variant='filled' size='small' label='Nationality' value={profile.nationality || ''}
                       onChange={e => setProfile(prev => ({...prev, nationality: e.target.value}))}/>
            <TextField variant='filled' size='small' label='Passport No.' value={profile.passport || ''}
                       onChange={e => setProfile(prev => ({...prev, passport: e.target.value}))}/>
            {/* <TextField variant='filled' label='Shoed size' value={profile.shoedSize || ''} onChange={e => setProfile(prev => ({ ...prev, shoedSize: e.target.value }))} /> */}
            <Button variant="contained" component="label" color="primary">
              Upload Government ID or Passport
              <input hidden accept="image/*" type="file"/>
            </Button>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
