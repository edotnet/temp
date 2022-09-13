import {useState, useEffect, useCallback, useMemo} from 'react';
import {useLocation} from "react-router-dom";
import {Endpoints} from "../../config/Consts";
import {AuthContext} from "./AuthContext";
import {api} from "../api/instance";

export function AuthProvider({children}) {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const location = useLocation();

  const login = useCallback((email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      api({
        url: Endpoints.auth.login, data: {email, password}, method: 'POST'
      })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data))
          resolve();
        })
        .catch((error) => {
          setError(error);
          reject();
        })
        .finally(() => setLoading(false));
    })
  }, []);

  const signup = useCallback((name, email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      api({
        url: Endpoints.auth.signup, data: {name, email, password}, method: 'POST'
      })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data))
          resolve();
        })
        .catch((error) => {
          setError(error);
          reject();
        })
        .finally(() => setLoading(false));
    })
  }, []);

  const requestRefresh = useCallback(() => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      api({
        url: Endpoints.auth.refresh, data: null, headers: {
          auth: user.accessToken,
        }
      }).then(res => {
        const newUser = {
          ...user, accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser))
        resolve();
      }).catch(err => {
        reject();
      }).finally(() => setLoading(false));
    });
  }, [user]);

  let logout = useCallback(() => {
    return new Promise((resolve) => {
      setUser(null);
      sessionStorage.clear();
      localStorage.clear();
      resolve();
    });
  }, []);

  const verify = useCallback((email, code) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      api({
        url: Endpoints.auth.verify, data: {email, code}, method: 'POST'
      })
        .then((res) => {
          if (!res) {
            const error = {response: {data: {message: 'Something went wrong'}}};
            setError(error);
            reject(error);
            return;
          }
          resolve();
        })
        .catch((error) => {
          setError(error);
          reject(error);
        })
        .finally(() => setLoading(false));
    })
  }, []);

  const resendVerify = useCallback((email) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      api({
        url: Endpoints.auth.verify, data: {email}, method: 'POST'
      })
        .then((res) => {
          if (!res) {
            const error = {response: {data: {message: 'Something went wrong'}}};
            setError(error);
            reject(error);
            return;
          }
          resolve();
        })
        .catch((error) => {
          setError(error);
          reject(error);
        })
        .finally(() => setLoading(false));
    })
  }, []);


  const memoedValue = useMemo(() => ({
    user, loading, error, login, signup, logout, verify, resendVerify
  }), [user, loading, error, login, signup, logout, verify, resendVerify]);

  // If we change page, reset the error state.
  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoadingInitial(false);
  }, []);

  useEffect(() => {
    api.interceptors.response.use((response) => {
      return response;
    }, async (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          requestRefresh().catch(() => {
            logout().then();
          }).then(() => {
          });
          return;
        }
      }
      return Promise.reject(error);
    });
  }, [logout, requestRefresh]);

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (<AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>);
}