import {useEffect} from 'react';
import {api} from './instance';

export const useApiToken = () => {

  useEffect(() => {
    const interceptorId = api.interceptors.request.use((config) => {
      // @ts-ignore
      config.headers['auth'] = localStorage.getItem('user').accessToken || null;
      return config;
    });
    return () => {
      api.interceptors.request.eject(interceptorId);
    };
  }, [])
}
