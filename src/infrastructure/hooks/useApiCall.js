import { useCallback, useEffect, useReducer } from 'react';
import axios, { Method } from 'axios';
axios.defaults.baseURL = 'http://localhost/';

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
      };
    case 'FAILURE':
      console.log('Failure');
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'ATTEMPT':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

export const useApiCall = (url, method = 'GET', body = null, autofetch = true) => {
  const controller = new AbortController();
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetch = useCallback(
    (url, method, body=null) => {
      dispatch({type: 'ATTEMPT'});
      axios({
        method,
        url,
        data: body,
        signal: controller.signal,
      })
        .then(res => dispatch({type: 'SUCCESS', payload: res.data}))
        .catch(err => dispatch({type: 'FAILURE', payload: err.message}))
    },
    [url, method, body],
  );
  useEffect(() => {
    if (autofetch) fetch(url, method, body);
    return () => {
      controller.abort();
    }
  }, [method, url, body]);

  return {...state, fetch};
};
