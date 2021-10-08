import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { post } from '../../../lib/post';

const LogoutButton = (props) => {
    const { logOut } = useContext(AuthContext);
    const router = useRouter();
    const logoutHandler = async () => {
        logOut();
        await post('/auth/sign-out');
        router.reload();
    };
    return (
        <Button onClick={logoutHandler} {...props}>
            Log out
        </Button>
    );
};

export default LogoutButton;