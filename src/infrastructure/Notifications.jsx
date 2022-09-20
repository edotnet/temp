import {useSnackbar} from 'notistack';
import {useCallback, useEffect} from 'react';
import OneSignal from 'react-onesignal';
import {Endpoints} from '../config/Consts';
import {useDashboardContext} from '../modules/dashboard/context/useDashboarContext';
import {dockingFetcher} from '../modules/dashboard/DockingFetcher';
import {api} from './api/instance';


export const Notifications = () => {
  const {dispatch} = useDashboardContext();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    OneSignal.init({
      appId: process.env.REACT_APP_ONESIGNAL_APPID,
      safari_web_id: process.env.REACT_APP_SAFARI_WEB_ID,
    }).then(() => {
      OneSignal.showSlidedownPrompt().then(() => {
        // do other stuff
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
                  }, dispatch);
                  break;
                case 'DOCKING_FAIL':
                  enqueueSnackbar('Docking failed', {variant: 'error'});
                  break;
                default:
                  break;
              }
            });        
            console.log('on')
          }else {
            console.log('Push notifications are not enabled yet.');
          }
        }).catch(err => console.log(err))    
      })
    });    
    return () => {
      console.log('off')
      //OneSignal.off('notificationDisplay', listener);
    };
  }, []);
  return null;
}