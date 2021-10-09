import { Heading, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import LogoutButton from '../components/auth/logout/LogoutButton';
import AppPage from '../components/layouts/AppPage';
import UserContext from '../contexts/UserContext';
import { useGet } from '../lib/hooks';

const Home = () => {
    const { currentUser } = useContext(UserContext);
    const { data } = useGet('/');

    return (
        <AppPage>
            <VStack mt={'10rem'} alignItems={'center'} spacing={'5rem'}>
                {data && <Heading textAlign={'center'} size={'lg'}>{data.content}</Heading>}
                {currentUser && <Heading textAlign={'center'}> You are {currentUser.username}</Heading>}
                <LogoutButton colorScheme={'blue'}/>
            </VStack>
        </AppPage>
    );
};

export default Home;