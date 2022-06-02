import { createContext, useState } from "react";

export const UserLoginContext = createContext();

export function UserLoginContextProvider({ children }) {

    const baseAPIUrl = "http://localhost:3333/api";

    const [userName, setUserName] = useState(null);
    const [logged, setLogged] = useState(false);

    return (
        <UserLoginContext.Provider value={{
            userName,
            setUserName,
            logged,
            setLogged,
            baseAPIUrl
        }}>
            {children}
        </UserLoginContext.Provider>
    )
}
