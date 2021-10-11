import { MenuItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { post } from '../../../lib/post';

const LogoutMenuItem = (props) => {
    const { logOut } = useContext(AuthContext);
    const router = useRouter();
    const logoutHandler = async () => {
        logOut();
        await post('/auth/sign-out');
        router.reload();
    };

    return (
        <MenuItem onClick={logoutHandler} {...props}>
            Logout
        </MenuItem>
    );
};

export default LogoutMenuItem;