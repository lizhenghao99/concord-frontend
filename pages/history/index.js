import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AppLoadingPage from '../../components/contents/AppLoadingPage';
import HistoryCard from '../../components/contents/history/HistoryCard';
import PageHeading from '../../components/contents/PageHeading';
import AppPage from '../../components/layouts/AppPage';
import { get } from '../../lib/get';

const History = (props) => {
    const size = 10;
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getData = async () => {
            if (!items) {
                const data = await get('/matches/page/', { pageNo: 1, pageSize: size });
                setItems(data.matches);
                setTotal(data.total);
                console.log(data.total);
            }
        };
        getData();
    }, [items]);


    const loadPage = async () => {
        const pageData = await get('/matches/page/', { pageNo: page + 1, pageSize: size });
        setItems(prevState => prevState.concat(pageData.matches));
        setPage(prevState => prevState + 1);
    };

    if (!items) {
        return (
            <AppPage>
                <AppLoadingPage/>
            </AppPage>
        );
    }
    return (
        <AppPage>
            <PageHeading mb={{ base: '1rem', lg: '5rem' }}>Recent Matches</PageHeading>
            <Box
                minW={{ base: '80%', lg: '50%' }}
                className={'my-scroll-box'}
                overflowY={'scroll'}
                id={'matchHistoryScrollBox'}
            >
                <InfiniteScroll
                    className={'my-infinite-scroll'}
                    next={loadPage}
                    hasMore={items.length < total}
                    loader={<Center><Spinner color={'blue.500'}/></Center>}
                    dataLength={items.length}
                    scrollableTarget={'matchHistoryScrollBox'}
                    endMessage={<Center><Text>You have reached the end</Text></Center>}
                >
                    {items.map((value, index) => (
                        <HistoryCard key={index} minW={'80%'} match={value}/>
                    ))}
                </InfiniteScroll>
            </Box>
        </AppPage>
    );
};

export default History;