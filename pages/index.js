import { Flex, Heading, useColorModeValue, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import LogoutButton from '../components/auth/logout/LogoutButton';
import ProtectedPage from '../components/auth/ProtectedPage';
import UserContext from '../contexts/UserContext';
import { useGet } from '../lib/hooks';

const Home = () => {
    const { currentUser } = useContext(UserContext);
    const { data } = useGet('/');

    return (
        <ProtectedPage>
            <Flex
                bg={useColorModeValue('gray.50', 'inherit')}
                minH="100vh"
                direction={'column'}
                alignItems={'center'}
            >
                <VStack mt={'10rem'} alignItems={'center'} spacing={'5rem'}>
                    {data && <Heading textAlign={'center'} size={'lg'}>{data.content}</Heading>}
                    {currentUser && <Heading textAlign={'center'}> You are {currentUser.username}</Heading>}
                    <LogoutButton colorScheme={'blue'}/>
                </VStack>
            </Flex>
        </ProtectedPage>
    );
};

export default Home;