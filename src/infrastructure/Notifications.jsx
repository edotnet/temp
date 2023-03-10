import {useSnackbar} from 'notistack';
import {useCallback, useEffect, useState} from 'react';
import OneSignal from 'react-onesignal';
import {Endpoints} from '../config/Consts';
import {useDashboardContext} from '../modules/dashboard/context/useDashboarContext';
import {dockingFetcher} from '../modules/dashboard/DockingFetcher';
import {api} from './api/instance';
import {useApiToken} from './api/useApiToken';
import {useAuth} from './authentication/useAuth';


export const Notifications = () => {
  const {state, dispatch} = useDashboardContext();
  const { enqueueSnackbar } = useSnackbar();
  const {user} = useAuth();
  const [init, setInit] = useState(false);

  useApiToken();
  useEffect(() => {
    OneSignal.init({
      appId: window.location.hostname === 'app.prepaire.com' ? process.env.REACT_APP_ONESIGNAL_APPID_PROD : process.env.REACT_APP_ONESIGNAL_APPID_DEV,
      safari_web_id: process.env.REACT_APP_SAFARI_WEB_ID,
    }).then(() => {
      OneSignal.showSlidedownPrompt().then(() => {
        // do other stuff
        setInit(true);
      })
    });
  }, []);

  useEffect(() => {
    if (!user || !init) {
      return;
    }
    OneSignal.isPushNotificationsEnabled().then((isEnabled) => {
      if (isEnabled) {
        OneSignal.getUserId().then((deviceId) => {
          api.post(Endpoints.notifications.register, {deviceId})
        });

        OneSignal.on('notificationDisplay', function(event) {
          if (!('data' in event) || !('type' in event.data)) {
            return;
          }
          switch(event.data.type) {
            case 'DOCKING':
              dockingFetcher(event.data.pdbId, {
                drugbank_id: event.data.drugbankId,
                name: event.data.name,
                calculated_properties: {
                  SMILES: event.data.smiles
                }
              }, dispatch, event.data.pdbPath, event.data.pdbId);
              break;
            case 'DOCKING_FAIL':
              enqueueSnackbar('Docking failed', {variant: 'error'});
              dispatch({type: 'addMoleculeDockingResponse', payload: {drug: event.data.name, data: null, status: 'error'}});
              break;
            case 'ALPHAFOLD':
              api.post(Endpoints.proteins.AlphaFold, {id: event.data.id}).then((res) => {
                dispatch({type: 'setAlphafold', payload: {...res.data, status: 'success'}});
              });
              break;
            case 'ALPHAFOLD_FAIL':
              dispatch({type: 'setAlphafold', payload: {status: 'failed'}});
              break;
            default:
              break;
          }
        });
      }else {
        console.log('Push notifications are not enabled yet.');
      }
    }).catch(err => console.log(err))
  }, [init, user]);
  return null;
}
