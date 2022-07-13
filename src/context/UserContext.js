import React, { createContext, useState, useMemo } from "react";

const UserContext = createContext({
    user: {},
    setUser: () => { },
});
// let datauser = JSON.parse(localStorage.getItem('user'))

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(
        {
            "id": "627a770b2c35fb0017422cdd",
            "theme": "delicious",
            "primaryColor": "#f5f5f5",
        }
    );
    const value = useMemo(() => ({ user, setUser }), [user]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

const StoreContextConsumer = UserContext.Consumer;
export { UserContext, UserContextProvider, StoreContextConsumer };