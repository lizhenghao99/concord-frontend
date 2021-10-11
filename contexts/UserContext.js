import { createContext, useState } from 'react';

const UserContext = createContext({
    user: undefined,
    setUser: () => {
    },
});

const UserContextProvider = (props) => {
    const [user, setUser] = useState(undefined);

    const context = {
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContextProvider };
export default UserContext;