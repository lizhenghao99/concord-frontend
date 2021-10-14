import { Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AppLoadingPage from '../../../../components/contents/AppLoadingPage';
import MatchLocalResponseList from '../../../../components/contents/match/MatchLocalResponseList';
import MatchSimpleSummaryCard from '../../../../components/contents/match/MatchSimpleSummaryCard';
import PageHeading from '../../../../components/contents/PageHeading';
import AppPage from '../../../../components/layouts/AppPage';
import { useGet } from '../../../../lib/hooks';

const InProgress = (props) => {
    const { query } = useRouter();
    const { data: match, isLoading } = useGet(`/matches/${query.id}`);
    const router = useRouter();


    if (!match) {
        return (
            <AppPage>
                <AppLoadingPage/>
            </AppPage>
        );
    }

    if (match.isCompleted) {
        router.push(`/result/${match.id}`);
        return (
            <AppPage>
                <AppLoadingPage/>
            </AppPage>
        );
    }

    return (
        <AppPage>
            <PageHeading>Match in Progress</PageHeading>
            <VStack mt={{ base: '2rem', lg: '5rem' }} spacing={'3rem'}>
                <MatchSimpleSummaryCard match={match}/>
                <Heading fontSize={'xl'}>Participants</Heading>
                <MatchLocalResponseList match={match}/>
            </VStack>
        </AppPage>
    );
};

export default InProgress;