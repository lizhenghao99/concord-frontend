import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddedParticipantsGrid from '../../../components/contents/match/create-match/AddedParticipantsGrid';
import AddRemoteParticipants from '../../../components/contents/match/create-match/AddRemoteParticipants';
import MatchTypeRadio from '../../../components/contents/match/create-match/MatchTypeRadio';
import VideoTags from '../../../components/contents/match/create-match/VideoTags';
import PageHeading from '../../../components/contents/PageHeading';
import AppPage from '../../../components/layouts/AppPage';
import { get } from '../../../lib/get';
import { post } from '../../../lib/post';
import { sleep } from '../../../lib/sleep';

const Index = (props) => {
    const [matchType, setMatchType] = useState('movie');
    const [videoTags, setVideoTags] = useState([]);
    const [friends, setFriends] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitError, setIsSubmitError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            if (!friends || friends.length === 0) {
                const data = await get('users/friends');
                setFriends(data);
            }
        };
        getData();
    }, [friends]);

    const radioChangeHandler = (e) => {
        setMatchType(e);
    };

    const tagChangeHandler = (values) => {
        setVideoTags(values);
    };

    const addParticipantHandler = (values) => {
        setParticipants(prevState => prevState.concat(values));
    };

    const removeParticipantHandler = (value) => {
        setParticipants(prevState => prevState.filter(e => e.id !== value.id));
    };

    const submitHandler = async () => {
        setIsSubmitting(true);
        try {
            const match = await post('/matches', {
                isLocal: 0,
                userNum: 1 + participants.length,
                remoteParticipants: participants,
            });
            const poll = await post('/polls', {
                matchId: match.id,
                type: matchType,
                extras: videoTags.join(','),
            });
            setIsSubmitted(true);
            setIsSubmitError(false);
            await sleep(1000);
            router.push(`/poll/${match.id}`);
        } catch (error) {
            console.log(error.message);
            setIsSubmitError(true);
        }
        setIsSubmitting(false);
    };

    return (
        <AppPage>
            <VStack spacing={'2rem'}>
                <PageHeading>Create Remote Match</PageHeading>
                <Box/>
                <MatchTypeRadio onChange={radioChangeHandler}/>
                {(matchType === 'movie') &&
                <VideoTags onChange={tagChangeHandler}/>}
                <AddRemoteParticipants
                    items={friends}
                    participants={participants}
                    onAdd={addParticipantHandler}
                />
                <AddedParticipantsGrid
                    items={participants}
                    onRemove={removeParticipantHandler}
                />
                <Button
                    colorScheme={'blue'}
                    isLoading={isSubmitting}
                    minW={'10rem'}
                    fontSize={'xl'}
                    onClick={submitHandler}
                >
                    Create
                </Button>
                {isSubmitted &&
                <Text color={'green.500'} align={'center'}>
                    Successfully created match. Redirecting to poll creation...
                </Text>}
                {isSubmitError &&
                <Text color={'red.500'} align={'center'}>
                    Please add your poll participants.
                </Text>}
            </VStack>
        </AppPage>
    );
};

export default Index;