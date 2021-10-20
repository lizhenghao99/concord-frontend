import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';

const AppScrollBox = (props) => {
    const { id, loadPage, items, total, ...rest } = props;
    return (
        <>
            <Box
                minW={{ base: '80%', lg: '50%' }}
                className={'my-scroll-box'}
                overflowY={'scroll'}
                id={id}
                {...rest}
            >
                <InfiniteScroll
                    className={'my-infinite-scroll'}
                    next={loadPage}
                    hasMore={items.length < total}
                    loader={<Center><Spinner color={'blue.500'}/></Center>}
                    dataLength={items.length}
                    scrollableTarget={id}
                    endMessage={<Center><Text>You have reached the end</Text></Center>}
                >
                    {props.children}
                </InfiniteScroll>
            </Box>
        </>
    );
};

export default AppScrollBox;