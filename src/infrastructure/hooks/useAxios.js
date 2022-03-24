import { useCallback, useEffect, useReducer } from 'react';
import axios, { Method } from 'axios';
axios.defaults.baseURL = 'https://api.publicapis.org/';

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
      alert('Failure');
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

export const useApiCall = (url, method, body = null) => {
  const controller = new AbortController();
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetch = useCallback(
    () => {
      dispatch({type: ActionType.ATTEMPT});
      axios({
        method,
        url,
        data: body,
        signal: controller.signal,
      })
        .then(res => dispatch({type: ActionType.SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: ActionType.FAILURE, payload: err.message}))
    },
    [],
  );
  useEffect(() => {
    fetch();
    return () => {
      controller.abort();
    }
  }, [method, url, body]);

  return state;
};
