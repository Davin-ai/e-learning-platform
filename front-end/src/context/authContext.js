import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userInfos: false,
    login: () => {},
    logout: () => {},
})

export default AuthContext;