import { ArrowDropDown, Check, Delete } from '@mui/icons-material';
import {
    Box,
    Button,
    ClickAwayListener,
    Divider,
    Drawer,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Portal,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { DateTime } from "luxon";
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Endpoints } from '../../config/Consts';
import { useDashboardContext } from '../../modules/dashboard/context/useDashboarContext';
import { useEngineContext } from '../../modules/engine/useEngineContext';
import { api } from '../api/instance';
import { ModalPaper } from '../components/ModalPaper';
import theme from "../config/theme";
import { useApiCall } from '../hooks/useApiCall';
import { hexToRgba } from "../utils";

export const Session = () => {
    const sessionListRequest = `${Endpoints.session.list}?pageNumber=0&pageSize=20`
    const {state: dashboardState, dispatch: dashboardDispatch} = useDashboardContext();
    const {state: engineState, dispatch: engineDispatch} = useEngineContext();
    const {data, error, fetch} = useApiCall(sessionListRequest, 'GET');
    const [currentSession, setCurrentSession] = useState('');
    const [openSaveDialog, setOpenSaveDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [historyOpen, setHistoryOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [forceNew, setForceNew] = useState(false);

    const menuOpen = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const populate = (sessionId) => {
        setCurrentSession(sessionId);
        const session = data.items.find((s) => s.id === sessionId);
        setTitle(session.title);
        setDescription(session.description);
        setLoading(true);
        api.get(Endpoints.session.get(sessionId)).then((res) => {
            const {data} = res;
            dashboardDispatch({type: 'restore', payload: data.data.dashboard});
            engineDispatch({type: 'restore', payload: data.data.engine});
        }).finally(() => setLoading(false));
    };
    const clean = () => {
        setCurrentSession('');
        dashboardDispatch({type: 'clean'});
        engineDispatch({type: 'clean'});
    }
    const onSave = (e) => {
        setOpenSaveDialog(true);
        setForceNew(false);
        const currentSessionData = data.items.find(session => session.id === currentSession);
        setTitle(currentSessionData.title);
        setDescription(currentSessionData.description);
    }
    const onSaveAs = (e) => {
        setOpenSaveDialog(true);
        setTitle('');
        setDescription('');
        setForceNew(true);
    }
    const save = () => {
        setLoading(true);
        const request = {
            title, description, data: {
                dashboard: dashboardState,
                engine: engineState
            }
        };
        let call;
        if (currentSession && ! forceNew) {
            call = api.put(Endpoints.session.update(currentSession), request);
        } else {
            call = api.post(Endpoints.session.create, request);
        }
        call.then((res) => {
            setTitle('');
            setDescription('');
            setOpenSaveDialog(false);
            setCurrentSession(res.data.id);
            fetch(sessionListRequest, 'GET');
            enqueueSnackbar('Session saved', {variant: 'success'});
        }).catch((e) => {
            enqueueSnackbar('Session not saved', {variant: 'error'});
        }).finally(() => setLoading(false));
    };
    const close = () => {
        setHistoryOpen(false);
    }

    const onSelect = sessionId => () => {
        populate(sessionId)
        close();
    }

    const onDelete = sessionId => (e) => {
        e.preventDefault();
        e.stopPropagation();
        api.delete(Endpoints.session.delete(sessionId)).then(() => {
            enqueueSnackbar('Session deleted', {variant: 'success'});
            fetch(sessionListRequest, 'GET');
        }).catch((e) => {
            enqueueSnackbar('Session not deleted', {variant: 'error'});
        });
    }

    const drawer = () => (
        <Drawer open={historyOpen} anchor="right" onClose={close}>
            <Typography variant="h6" sx={{ p: 2 }}>History</Typography>
            <Divider/>
            <List spacing={2} sx={{minWidth: 300}}>
                {data && data.items && data.items.map(item => listItem(item))}
            </List>
        </Drawer>
    )

    const listItem = (item) => (
        <ListItem 
            onClick={onSelect(item.id)} key={item.id}
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={onDelete(item.id)}>
                    <Delete />
                </IconButton>
            }
            sx={{
                pl: 2,
                pr: 2,
                cursor: 'pointer',
                '&:hover': {backgroundColor: hexToRgba(theme.palette.primary.main, 0.1)}
            }}>
            <ListItemText primary={item.title} secondary={item.description || DateTime.fromISO(item.createdAt).toFormat('D H:mm')} />
        </ListItem>
    )

    const saveDialog = () => (
        <ClickAwayListener onClickAway={() => setOpenSaveDialog(false)}>
            <ModalPaper elevation={2} sx={{
                position: 'absolute', top: '100%', right: '75%', zIndex: 10, width: 230
            }}>
                <Stack p={2} spacing={2}>
                    <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} variant="standard" />
                    <TextField label="Description" onChange={e => setDescription(e.target.value)} 
                        variant="standard" multiline rows={3} value={description} />
                    <Button onClick={save} variant="outlined" endIcon={<Check/>}>Save</Button>
                </Stack>
            </ModalPaper>
        </ClickAwayListener>
    )

    const menuItem = (itemText, onClick, disabled = false) => (
        <MenuItem disabled={disabled} onClick={onClick}>
            <ListItemText>{itemText}</ListItemText>
        </MenuItem>
    )

    return (<Box position='relative'>
        {drawer()}
        <Stack spacing={2} direction="row">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>{currentSession && data ? data.items.find(i => i.id === currentSession)?.title : 'Not saved...'}</Typography>
            </Box>
            <IconButton onClick={handleOpenMenu}>
                <ArrowDropDown/>
            </IconButton>
            <Menu open={menuOpen} onClose={handleCloseMenu} anchorEl={anchorEl} transformOrigin={{ 
                horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                {menuItem('History', () => {
                    handleCloseMenu()
                    setHistoryOpen(true)
                })}
                {menuItem('Refresh', () => {
                    clean()
                    handleCloseMenu()
                })}
                {menuItem('Save', e => {
                    handleCloseMenu()
                    onSave(e)
                }, !currentSession)}
                {menuItem('Save as...', e => {
                    handleCloseMenu()
                    onSaveAs(e)
                })}
            </Menu>
        </Stack>
        {openSaveDialog && saveDialog()}
        <Portal>
            {loading && <LinearProgress sx={{position: 'absolute', top: 80, width: '100vw'}}/>}
        </Portal>
    </Box>);
}
