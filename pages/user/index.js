import { VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import LoadingPage from '../../components/contents/LoadingPage';
import ProfileComponent from '../../components/contents/profile/ProfileComponent';
import AppPage from '../../components/layouts/AppPage';
import PageHeading from '../../components/layouts/PageHeading';
import UserContext from '../../contexts/UserContext';

const UserIndex = (props) => {
    const { user } = useContext(UserContext);
    return (
        <AppPage>
            {!user && <LoadingPage/>}
            {user && <VStack spacing={'5rem'}>
                <PageHeading>User Profile</PageHeading>
                <ProfileComponent/>
            </VStack>}
        </AppPage>
    );
};

export default UserIndex;