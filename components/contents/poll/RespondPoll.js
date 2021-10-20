import { Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGet } from '../../../lib/hooks';
import { post } from '../../../lib/post';
import { sleep } from '../../../lib/sleep';
import AppLoadingPage from '../AppLoadingPage';
import PageHeading from '../PageHeading';
import PollSelection from './PollSelection';

const RespondPoll = (props) => {
    const { match, name, user } = props;
    const { data: videos } = useGet(`/videos/${match.poll.items}`);
    const [respond, setRespond] = useState([]);
    const [index, setIndex] = useState(0);
    const respondedNames = match.isLocal ?
        match.poll.responses.map(value => value.localName)
        : match.poll.responses.map(value => value.user.id);
    const router = useRouter();

    useEffect(() => {
        const submitResponse = async () => {
            const respondBody = {
                pollId: match.poll.id,
                entries: respond,
                localName: match.isLocal ? name : '',
            };
            await post(`/polls/respond`, respondBody);
            await sleep(1000);
            if (match.isLocal) {
                router.push(`/match/local/in-progress/${match.id}`);
            } else {
                router.push(`/match/remote/in-progress/${match.id}`);
            }
        };
        if (videos && index === videos.length) {
            submitResponse();
        }
    }, [index, videos]);

    const pushRespondEntry = (entry) => {
        setRespond(prevState => {
            prevState.push(entry);
            return prevState;
        });
    };

    if ((match.isLocal && respondedNames.includes(name)) ||
        (!match.isLocal && respondedNames.includes(user.id))
    ) {
        setTimeout(() => {
            if (match.isLocal) {
                router.push(`/match/local/in-progress/${match.id}`);
            } else {
                router.push(`/match/remote/in-progress/${match.id}`);
            }
        }, 1000);
        return (
            <>
                <PageHeading>
                    You have already responded to this poll
                </PageHeading>
                <VStack mt={'5rem'} spacing={'2rem'}>
                    <Text fontSize={'xl'} align={'center'}>
                        Returning to summary...
                    </Text>
                    <Spinner color={'blue.500'} size={'lg'}/>
                </VStack>
            </>
        );
    }

    if ((match.isLocal && !match.localParticipants.split(',').includes(name)) ||
        (!match.isLocal && !match.remoteParticipants.map(value => value.id).includes(user.id))
    ) {
        return (
            <>
                <PageHeading>
                    You are not invited to this poll
                </PageHeading>
            </>
        );
    }

    if (!videos) {
        return (
            <AppLoadingPage/>
        );
    }

    const rateItems = (
        <PollSelection
            items={videos}
            index={index}
            setIndex={setIndex}
            onPush={pushRespondEntry}
            name={match.isLocal ? name : user.userInfo.nickname}
        />
    );

    const ratingFinished = (
        <>
            <PageHeading>You have finished your selections</PageHeading>
            <VStack mt={{ base: '2rem', lg: '5rem' }} spacing={'2rem'}>
                <Text color={'green.500'} fontSize={'xl'} align={'center'}>
                    Your selections have been saved
                </Text>
                <Text color={'green.500'} fontSize={'xl'} align={'center'}>
                    Returning to summary...
                </Text>
                <Spinner color={'blue.500'} size={'lg'}/>
            </VStack>
        </>
    );

    return (
        <>
            {index < videos.length ? rateItems : ratingFinished}
        </>
    );
};

export default RespondPoll;