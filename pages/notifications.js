import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AppLoadingPage from '../components/contents/AppLoadingPage';
import NotificationModal from '../components/contents/notification/NotificationModal';
import PageHeading from '../components/contents/PageHeading';
import AppPage from '../components/layouts/AppPage';
import AppScrollBox from '../components/layouts/AppScrollBox';
import UserContext from '../contexts/UserContext';
import { get } from '../lib/get';

const Notifications = (props) => {
    const size = 10;
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(null);
    const [total, setTotal] = useState(0);
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            if (!items) {
                const data = await get('/notifications/received/page', { pageNo: 1, pageSize: size });
                setItems(data.notifications);
                setTotal(data.total);
            }
        };
        getData();
    }, [items]);


    const loadPage = async () => {
        const pageData = await get('/notifications/received/page', { pageNo: page + 1, pageSize: size });
        setItems(prevState => prevState.concat(pageData.matches));
        setPage(prevState => prevState + 1);
    };

    if (!items || !user) {
        return (
            <AppPage>
                <AppLoadingPage/>
            </AppPage>
        );
    }
    return (
        <AppPage>
            <PageHeading mb={{ base: '1rem', lg: '5rem' }}>Notifications</PageHeading>
            <AppScrollBox
                id={'notifications'}
                loadPage={loadPage}
                items={items}
                total={total}
            >
                {items.map((value, index) => (
                    <NotificationModal
                        key={index}
                        minW={'80%'}
                        value={value}
                        user={user}
                        router={router}
                    />
                ))}
            </AppScrollBox>
        </AppPage>
    );
};

export default Notifications;