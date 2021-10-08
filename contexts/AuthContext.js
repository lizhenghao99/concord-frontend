import { createContext, useState } from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    logIn: () => {
    },
    logOut: () => {
    },
});

const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const logInHandler = () => setIsLoggedIn(true);
    const logOutHandler = () => setIsLoggedIn(false);
    const context = {
        isLoggedIn,
        logIn: logInHandler,
        logOut: logOutHandler,
    };

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContextProvider };
export default AuthContext;