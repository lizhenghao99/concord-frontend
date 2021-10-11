import { Heading, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import AppPage from '../components/layouts/AppPage';
import UserContext from '../contexts/UserContext';
import { useGet } from '../lib/hooks';

const Home = () => {
    const { user } = useContext(UserContext);
    const { data } = useGet('/');

    return (
        <AppPage>
            <VStack mt={'10rem'} alignItems={'center'} spacing={'5rem'}>
                {data && <Heading textAlign={'center'} size={'lg'}>{data.content}</Heading>}
                {user && <Heading textAlign={'center'}> You are {user.username}</Heading>}
            </VStack>
        </AppPage>
    );
};

export default Home;