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

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    logout().then();
                }
            }
            return Promise.reject(error);
        }
    );

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