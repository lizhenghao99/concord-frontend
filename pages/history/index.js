import { Text } from '@chakra-ui/react';
import { useContext } from 'react';
import LoadingPage from '../../components/contents/LoadingPage';
import AppPage from '../../components/layouts/AppPage';
import { Card } from '../../components/layouts/Card';
import PageHeading from '../../components/layouts/PageHeading';
import UserContext from '../../contexts/UserContext';
import { useGet } from '../../lib/hooks';

const History = (props) => {
    const { user } = useContext(UserContext);
    const { data, isLoading } = useGet('/matches');

    if (isLoading) {
        return (
            <AppPage>
                <LoadingPage/>
            </AppPage>
        );
    }
    return (
        <AppPage>
            <PageHeading>Recent Matches</PageHeading>
            {data.map((value, index) => (
                <Card key={index} maxW={'80%'}>
                    <Text>
                        {JSON.stringify(value)}
                    </Text>
                </Card>
            ))}
        </AppPage>
    );
};

export default History;