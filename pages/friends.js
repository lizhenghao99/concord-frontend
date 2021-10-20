import { useEffect, useState } from 'react';
import AppLoadingPage from '../components/contents/AppLoadingPage';
import PageHeading from '../components/contents/PageHeading';
import AddFriendModal from '../components/contents/user/AddFriendModal';
import FriendModal from '../components/contents/user/FriendModal';
import AppPage from '../components/layouts/AppPage';
import AppScrollBox from '../components/layouts/AppScrollBox';
import { get } from '../lib/get';

const Friends = (props) => {
    const size = 10;
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getData = async () => {
            if (!items) {
                const data = await get('users/friends/page', { pageNo: 1, pageSize: size });
                setItems(data.friends);
                setTotal(data.total);
            }
        };
        getData();
    }, [items]);


    const loadPage = async () => {
        const pageData = await get('users/friends/page', { pageNo: page + 1, pageSize: size });
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
            <PageHeading mb={{ base: '1rem', lg: '3rem' }}>Friends List</PageHeading>
            <AddFriendModal/>
            <AppScrollBox
                id={'notifications'}
                loadPage={loadPage}
                items={items}
                total={total}
            >
                {items.map((value, index) => (
                    <FriendModal key={index} minW={'80%'} value={value}/>
                ))}
            </AppScrollBox>
        </AppPage>
    );
};

export default Friends;