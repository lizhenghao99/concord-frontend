import { Box, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import AddLocalNames from '../../components/contents/match/create-match/AddLocalNames';
import MatchTypeRadio from '../../components/contents/match/create-match/MatchTypeRadio';
import VideoTags from '../../components/contents/match/create-match/VideoTags';
import AppPage from '../../components/layouts/AppPage';
import PageHeading from '../../components/layouts/PageHeading';
import { post } from '../../lib/post';

const Local = (props) => {
    const [matchType, setMatchType] = useState('movie');
    const [videoTags, setVideoTags] = useState([]);

    const radioChangeHandler = (e) => {
        setMatchType(e);
    };

    const tagChangeHandler = (values) => {
        setVideoTags(values);
    };

    const submitHandler = async (names) => {
        const match = await post('/matches', {
            isLocal: 1,
            userNum: 1 + names.length,
            localParticipants: names.join(','),
        });
        const poll = await post('/polls', {
            matchId: match.id,
            type: matchType,
            extras: videoTags.join(','),
        });
        return match.id;
    };

    return (
        <AppPage>
            <VStack spacing={'2rem'}>
                <PageHeading>Create Local Match</PageHeading>
                <Box/>
                <MatchTypeRadio onChange={radioChangeHandler}/>
                {(matchType === 'movie' || matchType === 'series') &&
                <VideoTags onChange={tagChangeHandler}/>}
                <AddLocalNames submitHandler={submitHandler}/>
            </VStack>
        </AppPage>
    );
};

export default Local;