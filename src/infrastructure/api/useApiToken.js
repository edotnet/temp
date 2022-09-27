import {useEffect} from 'react';
import {api} from './instance';
import {useAuth} from "../authentication/useAuth";

export const useApiToken = () => {
  const {user} = useAuth();
  useEffect(() => {
    if (!user) {
      return;
    }
    const interceptorId = api.interceptors.request.use((config) => {
      // @ts-ignore
      config.headers['auth'] = user.accessToken || null;
      config.headers['X-API-KEY'] = user.user.apiKey || null;
      return config;
    });
    return () => {
      api.interceptors.request.eject(interceptorId);
    };
  }, [user])
}
