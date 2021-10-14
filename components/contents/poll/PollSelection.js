import { Button, SimpleGrid, useBreakpointValue, VStack } from '@chakra-ui/react';
import PageHeading from '../PageHeading';
import VideoCard from './VideoCard';

const PollSelection = (props) => {
    const { items, index, setIndex, onPush, name } = props;
    const columns = useBreakpointValue({ base: 2, lg: 4 });
    const spacing = useBreakpointValue({ base: '0.5rem', lg: '2rem' });
    const isMobile = useBreakpointValue({ base: true, lg: false });
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

    return (
        <>
            <PageHeading>{name}, how do you like?</PageHeading>
            <VStack mt={'3rem'} spacing={spacing}>
                <VideoCard
                    key={index}
                    video={items[index]}
                    isMobile={isMobile}
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
};

export default PollSelection;