import { Box, Flex, Heading, Spacer, Spinner, useColorModeValue } from '@chakra-ui/react';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useUser } from '../../lib/hooks';
import LoadingPage from '../contents/LoadingPage';

const ProtectedPage = (props) => {
    const { isLoggedIn } = useContext(AuthContext);
    const { user, isLoading, isError } = useUser('/auth/login');

    const notLoggedInPage = (
        <Flex
            bg={useColorModeValue('gray.50', 'inherit')}
            minH="100vh"
            direction={'column'}
            alignItems={'center'}
        >
            <Spacer/>
            <Heading>You are not logged in.</Heading>
            <Box minH={'1rem'}/>
            <Heading>Redirecting to login page...</Heading>
            <Box minH={'3rem'}/>
            <Spinner size={'xl'}/>
            <Spacer/>
        </Flex>
    );

    return (
        <>
            {!isLoggedIn && isLoading && <LoadingPage/>}
            {isError && notLoggedInPage}
            {isLoggedIn && props.children}
        </>
    );
};

export default ProtectedPage;