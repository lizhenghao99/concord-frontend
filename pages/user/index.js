import { VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import AppLoadingPage from '../../components/contents/AppLoadingPage';
import PageHeading from '../../components/contents/PageHeading';
import ProfileComponent from '../../components/contents/profile/ProfileComponent';
import AppPage from '../../components/layouts/AppPage';
import UserContext from '../../contexts/UserContext';

const UserIndex = (props) => {
    const { user } = useContext(UserContext);
    return (
        <AppPage>
            {!user && <AppLoadingPage/>}
            {user && <VStack spacing={{ base: '2rem', lg: '5rem' }}>
                <PageHeading>User Profile</PageHeading>
                <ProfileComponent/>
            </VStack>}
        </AppPage>
    );
};

export default UserIndex;