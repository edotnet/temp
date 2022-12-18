import {useCallback, useEffect, useReducer} from 'react';
import axios from 'axios';
import {Consts} from "../../config/Consts";
import {useAuth} from "../authentication/useAuth";

axios.defaults.baseURL = Consts.API_URL;

const initialState = {
  data: null,
  error: null,
  loading: false,
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case 'FAILURE':
      return {
        ...state,
        data: null,
        error: action.payload,
        loading: false,
      };
    case 'ATTEMPT':
      return {
        ...state,
        data: null,
        error: false,
        loading: true,
      };
    case 'RESET':
      return {
        ...state,
        ...initialState,
      }
    default:
      return state;
  }
}

export function encodeQuery(url) {
  return encodeURIComponent(url/*.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')*/);
}

export const useApiCall = (url, method = 'GET', body = null, autofetch = true) => {
  const controller = new AbortController();
  const [state, dispatch] = useReducer(reducer, initialState, () => {
  });
  const {user} = useAuth();
  const execute = useCallback(
    (url, method, body = null) => {
      dispatch({type: 'ATTEMPT'});
      const call = axios({
        method,
        url,
        data: body,
        signal: controller.signal,
        headers: {
          auth: user.accessToken,
          'X-API-KEY': user.user.apiKey
        }
      });
      call.then(res => dispatch({type: 'SUCCESS', payload: res.data}))
      .catch((...err) => {
        dispatch({type: 'FAILURE', payload: err.message})
      })
      return call;
    },
    [url, method, body],
  );
  const reset = useCallback(() => {
    dispatch({type: 'RESET'});
  }, []);

  useEffect(() => {
    if (autofetch) execute(url, method, body);
    return () => {
      controller.abort();
    }
  }, [method, url, body]);

  return {...state, fetch: execute, reset};
};
