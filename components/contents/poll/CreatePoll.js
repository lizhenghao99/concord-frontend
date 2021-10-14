import { Button, SimpleGrid, useBreakpointValue, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import PageHeading from '../../layouts/PageHeading';
import VideoCard from './VideoCard';

const CreatePoll = (props) => {
    const { items, onPush, onMore, onCreate, moreButtonLoading, createButtonLoading } = props;
    const [index, setIndex] = useState(0);
    const columns = useBreakpointValue({ base: 2, lg: 4 });
    const buttonList = [
        {
            text: 'Nope',
            score: 0,
        },
        {
            text: 'Maybe...',
            score: 1,
        },
        {
            text: 'Yes',
            score: 2,
        },
        {
            text: 'Hell yeah!',
            score: 3,
        },
    ];

    const onRatingClickHandler = (e) => {
        onPush({ item: items[index].id, score: e.target.value });
        setIndex(prevState => prevState + 1);
    };

    const rateItems = (
        <>
            <PageHeading>How do you like?</PageHeading>
            <VStack mt={'3rem'}>
                < VideoCard
                    key={index}
                    video={items[index]}
                />
                <SimpleGrid columns={columns} spacing={'2rem'}>
                    {buttonList.map((value, index) => (
                        <Button
                            key={index}
                            minW={'5rem'}
                            value={value.score}
                            onClick={onRatingClickHandler}
                        >
                            {value.text}
                        </Button>
                    ))}
                </SimpleGrid>
            </VStack>
        </>
    );

    const buttons = (
        <>
            <PageHeading>Poll generation completed</PageHeading>
            <VStack mt={'10rem'} spacing={'5rem'}>
                <Button
                    size={'lg'}
                    fontSize={'xl'}
                    onClick={onMore}
                    isLoading={moreButtonLoading}
                >
                    More selections
                </Button>
                <Button
                    colorScheme={'blue'}
                    size={'lg'}
                    fontSize={'xl'}
                    onClick={onCreate}
                    isLoading={createButtonLoading}
                >
                    Publish poll
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