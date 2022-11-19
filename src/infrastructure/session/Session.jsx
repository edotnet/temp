import {Check, DeleteOutline, Save} from '@mui/icons-material';
import {
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  LinearProgress,
  MenuItem,
  Portal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {useSnackbar} from 'notistack';
import {useState} from 'react';
import {Endpoints} from '../../config/Consts';
import {useDashboardContext} from '../../modules/dashboard/context/useDashboarContext';
import {useEngineContext} from '../../modules/engine/useEngineContext';
import {api} from '../api/instance';
import {ModalPaper} from '../components/ModalPaper';
import {useApiCall} from '../hooks/useApiCall';

export const Session = () => {
  const {state: dashboardState, dispatch: dashboardDispatch} = useDashboardContext();
  const {state: engineState, dispatch: engineDispatch} = useEngineContext();
  const {data, error, fetch} = useApiCall(Endpoints.session.list, 'GET');
  const [currentSession, setCurrentSession] = useState('');
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [coordinates, setCoordinates] = useState({x: 0, y: 0});
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const populate = (e) => {
    setCurrentSession(e.target.value);
    setLoading(true);
    api.get(Endpoints.session.get(e.target.value)).then((res) => {
      const {data} = res;
      dashboardDispatch({type: 'restore', payload: data.data.dashboard});
      engineDispatch({type: 'populate', payload: data.data.engine});
    }).finally(() => setLoading(false));
  };
  const clean = () => {
    setCurrentSession('');
    dashboardDispatch({type: 'clean'});
    engineDispatch({type: 'clean'});
  }
  const onSave = (e) => {
    setOpenSaveDialog(true);
    setCoordinates({x: e.clientX, y: e.clientY});
  }
  const save = () => {
    setLoading(true);
    api.post(Endpoints.session.create, {
      title,
      description: '',
      data: {
        dashboard: dashboardState,
        engine: engineState
      }
    }).then((res) => {
      setTitle('');
      setOpenSaveDialog(false);
      setCurrentSession(res.data.id);
      fetch();
      enqueueSnackbar('Session saved', {variant: 'success'});
    }).catch((e) => {
      enqueueSnackbar('Session not saved', {variant: 'error'});
    }).finally(() => setLoading(false));
  };
  return (
    <>
    <Stack spacing={2} direction="row">
      {data && data.items && data.items.length ? <TextField fullWidth select label="Session" value={currentSession} onChange={populate} variant="standard">
        {data.items.map((session) => <MenuItem key={session.id} value={session.id}>{session.title}</MenuItem>)}
      </TextField> : <Box sx={{display: 'flex', alignItems: 'center'}}><Typography>Save your first session!</Typography></Box>}
      <IconButton onClick={onSave}>
        <Save />
      </IconButton>
      <IconButton onClick={clean}>
        <DeleteOutline />
      </IconButton>
    </Stack>
      {openSaveDialog && <ClickAwayListener onClickAway={() => setOpenSaveDialog(false)}>
        <ModalPaper elevation={2} sx={{
          position: 'absolute',
          top: coordinates?.y || '50%',
          left: coordinates?.x || '50%',
          zIndex: 10,
        }}>
          <Stack p={2} spacing={ 2}>
              <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} variant="standard"/>
              <TextField label="Description" value={title} onChange={e => setDescription(e.target.value)} variant="standard" multiline rows={3}/>
            <Button onClick={save} variant="outlined" endIcon={<Check />}>Save</Button>
          </Stack>
        </ModalPaper>
      </ClickAwayListener>}
      <Portal>
        {loading && <LinearProgress sx={{position: 'absolute', top: 80, width: '100vw'}}/>}take
      </Portal>
    </>
  );
}
