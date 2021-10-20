import { useEffect, useState } from 'react';
import AppLoadingPage from '../../components/contents/AppLoadingPage';
import HistoryCard from '../../components/contents/history/HistoryCard';
import PageHeading from '../../components/contents/PageHeading';
import AppPage from '../../components/layouts/AppPage';
import AppScrollBox from '../../components/layouts/AppScrollBox';
import { get } from '../../lib/get';

const Participated = (props) => {
    const size = 10;
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getData = async () => {
            if (!items) {
                const data = await get('/matches/participated/page', { pageNo: 1, pageSize: size });
                setItems(data.matches);
                setTotal(data.total);
            }
        };
        getData();
    }, [items]);


    const loadPage = async () => {
        const pageData = await get('/matches/participated/page', { pageNo: page + 1, pageSize: size });
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
            <PageHeading mb={{ base: '1rem', lg: '5rem' }}>Participated Matches</PageHeading>
            <AppScrollBox
                id={'participatedMatchesHistory'}
                loadPage={loadPage}
                items={items}
                total={total}
            >
                {items.map((value, index) => (
                    <HistoryCard key={index} minW={'80%'} match={value}/>
                ))}
            </AppScrollBox>
        </AppPage>
    );
};

export default Participated;