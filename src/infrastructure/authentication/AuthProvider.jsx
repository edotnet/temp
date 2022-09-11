import {useState, useEffect, useCallback, useMemo} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import {Endpoints} from "../../config/Consts";
import {AuthContext} from "./AuthContext";

export function AuthProvider({children}) {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  console.log('provider error', error)
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const location = useLocation();

  const login = useCallback((email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios({
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
      axios({
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
      axios({
        url: Endpoints.auth.refresh, data: null, headers: {
          auth: user.accessToken,
        }
      }).then(res => {
        const newUser = {
          ...user, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken,
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


  const memoedValue = useMemo(() => ({
    user, loading, error, login, signup, logout,
  }), [user, loading, error, login, signup, logout]);

  // If we change page, reset the error state.
  useEffect(() => {
    if (error) setError(null);
  }, [error, location.pathname]);

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user));
    }
    setLoadingInitial(false);
  }, []);

  useEffect(() => {
    axios.interceptors.response.use((response) => {
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