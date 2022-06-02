import { createContext, useState } from "react";

export const UserLoginContext = createContext();

export function UserLoginContextProvider({ children }) {

    const [userName, setUserName] = useState(null);
    const [logged, setLogged] = useState(false);

    return (
        <UserLoginContext.Provider value={{
            userName,
            setUserName,
            logged,
            setLogged
        }}>
            {children}
        </UserLoginContext.Provider>
    )
}
