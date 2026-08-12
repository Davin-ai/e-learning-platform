import React, { useCallback, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from "./context/authContext";


function App() {

  const router = useRoutes(routes)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(false)
  const [userInfos, setUserInfos] = useState({})

  const login = (userInfos, token) => {
    setToken(token)
    setUserInfos(userInfos)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify({ token }));
  }

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  });

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    if (localStorageData) {
      fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        }
      }).then((res) => res.json())
        .then((data) => {
          setIsLoggedIn(true)
          setUserInfos(data)
        }
        )
    }else (
      setIsLoggedIn(false)
    )

  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}

export default App;
