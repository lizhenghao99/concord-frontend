import { Box, Flex, Heading, Spacer, Spinner, useColorModeValue } from '@chakra-ui/react';
import { LoginComponent } from '../../components/auth/login/LoginComponent';
import { useUser } from '../../lib/hooks';

const Login = (props) => {
    const { user, isLoading, isError } = useUser('/', true);
    const alreadyLoggedInPage = (
        <Flex
            bg={useColorModeValue('gray.50', 'inherit')}
            minH="100vh"
            direction={'column'}
            alignItems={'center'}
        >
            <Spacer/>
            <Heading>You are already logged in.</Heading>
            <Box minH={'1rem'}/>
            <Heading>Redirecting to home page...</Heading>
            <Box minH={'3rem'}/>
            <Spinner size={'xl'}/>
            <Spacer/>
        </Flex>
    );

    const loadingPage = (
        <Flex
            bg={useColorModeValue('gray.50', 'inherit')}
            minH="100vh"
            direction={'column'}
            alignItems={'center'}
        >
            <Spacer/>
            <Spinner size={'xl'}/>
            <Spacer/>
        </Flex>
    );

    return (
        <>
            {isLoading && loadingPage}
            {user && alreadyLoggedInPage}
            {isError && <LoginComponent/>}
        </>
    );
};

export default Login;