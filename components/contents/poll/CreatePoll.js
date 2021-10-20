import { Button, VStack } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import AppLoadingPage from '../AppLoadingPage';
import PageHeading from '../PageHeading';
import PollSelection from './PollSelection';

const CreatePoll = (props) => {
    const { items, onPush, onMore, onCreate, moreButtonLoading, createButtonLoading } = props;
    const [index, setIndex] = useState(0);
    const { user } = useContext(UserContext);

    if (!user) {
        return (
            <>
                <AppLoadingPage/>
            </>
        );
    }

    const rateItems = (
        <PollSelection
            items={items}
            index={index}
            setIndex={setIndex}
            onPush={onPush}
            name={user.userInfo.nickname}
        />
    );

    const buttons = (
        <>
            <PageHeading>You have finished your selections</PageHeading>
            <VStack mt={'10rem'} spacing={'5rem'}>
                <Button
                    size={'lg'}
                    fontSize={'xl'}
                    onClick={onMore}
                    isLoading={moreButtonLoading}
                >
                    More Selections
                </Button>
                <Button
                    colorScheme={'blue'}
                    size={'lg'}
                    fontSize={'xl'}
                    onClick={onCreate}
                    isLoading={createButtonLoading}
                >
                    Publish Poll
                </Button>
            </VStack>
        </>
    );

    return (
        <>
            {index < items.length ? rateItems : buttons}
        </>
    );
};

export default CreatePoll;