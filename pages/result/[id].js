import { useBreakpointValue, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AppLoadingPage from '../../components/contents/AppLoadingPage';
import PageHeading from '../../components/contents/PageHeading';
import VideoCard from '../../components/contents/poll/VideoCard';
import LinkButton from '../../components/input/LinkButton';
import AppPage from '../../components/layouts/AppPage';
import UserContext from '../../contexts/UserContext';
import { get } from '../../lib/get';
import { useGet } from '../../lib/hooks';

const Result = (props) => {
    const { query } = useRouter();
    const { data: match } = useGet(`/matches/${query.id}`);
    const { user } = useContext(UserContext);
    const [videos, setVideos] = useState(null);
    const isMobile = useBreakpointValue({ base: true, lg: false });

    useEffect(() => {
        const getVideos = async () => {
            const videosData = await get(`/videos/${match.result}`);
            setVideos(videosData);
        };
        if (match) {
            getVideos();
        }
    }, [match]);

    if (!match || !videos || !user) {
        return (
            <AppPage>
                <AppLoadingPage/>
            </AppPage>
        );
    }

    return (
        <AppPage>
            <PageHeading>Match Result</PageHeading>
            <VStack mt={{ base: '2rem', lg: '5rem' }} spacing={'2rem'}>
                <VideoCard video={videos[0]} isMobile={isMobile}/>
                <LinkButton
                    href={user.id === match.host.id ? '/history/hosted' : '/history/participated'}
                    text={'back'}
                    size={'lg'}
                />
            </VStack>
        </AppPage>
    );
};

export default Result;