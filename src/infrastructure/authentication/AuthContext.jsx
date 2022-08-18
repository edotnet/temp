import {createContext, useEffect, useMemo, useState, useCallback} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import {Endpoints} from "../../config/Consts";

export const AuthContext = createContext({});

export function AuthProvider({children}) {
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const location = useLocation();

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
        axios.interceptors.response.use(
          (response) => {
              return response;
          },
          async (error) => {
              console.log("auth err", error)
              if (error.response) {
                  if (error.response.status === 401) {
                      console.log('status 401, refresh')
                      requestRefresh().catch(() => {
                          console.log('catch refresh')
                          logout().then();
                      }).then(() => {
                          console.log('refreshed')
                      });
                      return;
                  }
              }
              return Promise.reject(error);
          }
        );
    }, []);


    const login = useCallback((email, password) => {
        return new Promise((resolve, reject) => {
            setLoading(true);
            axios({
                url: Endpoints.auth.login,
                data: { email, password },
                method: 'POST'
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
        console.log('callback refresh')
        return new Promise((resolve, reject) => {
            console.log('promise refresh')
            setLoading(true);
            axios({
                url: Endpoints.auth.refresh,
                data: null,
                headers: {
                    auth: user.accessToken,
                }
            }).then(res => {
                console.log('refresh then')
                const newUser = {
                    ...user,
                    accessToken: res.data.accessToken
                };
                console.log('refresh', newUser)
                setUser(newUser);
                localStorage.setItem('user', JSON.stringify(newUser))
                resolve();
            }).catch(err => {
                console.log('err refresh', err)
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


    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            logout,
        }),
        [user, loading, error, login, logout]
    );

    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}