import { createContext, useState } from 'react';

const UserContext = createContext({
    currentUser: undefined,
    setCurrentUser: () => {
    },
});

const UserContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(undefined);

    const context = {
        currentUser,
        setCurrentUser,
    };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContextProvider };
export default UserContext;