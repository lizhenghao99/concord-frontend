import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import AppLoadingPage from '../../components/contents/AppLoadingPage';
import CreatePoll from '../../components/contents/poll/CreatePoll';
import AppPage from '../../components/layouts/AppPage';
import { get } from '../../lib/get';
import { useGet } from '../../lib/hooks';
import { patch } from '../../lib/patch';
import { post } from '../../lib/post';

const Poll = (props) => {
    const { query } = useRouter();
    const { data: match, isLoading } = useGet(`/matches/${query.id}`);
    const [items, setItems] = useState([]);
    const [respond, setRespond] = useState([]);
    const [moreButtonLoading, setMoreButtonLoading] = useState(false);
    const [createButtonLoading, setCreateButtonLoading] = useState(false);
    const router = useRouter();

    const pushRespondEntry = (entry) => {
        setRespond(prevState => {
            prevState.push(entry);
            return prevState;
        });
    };

    const fetchItemsData = useCallback(async () => {
        if (match) {
            let itemsData;
            switch (match.poll.type) {
                case 'movie':
                case 'series':
                    itemsData = await get(`/videos`, {
                        type: match.poll.type,
                        genrelist: match.poll.extras,
                        start_year: 2000,
                        limit: 10,
                    });
                    break;
            }
            setItems(prevState => (prevState.concat(itemsData)));
        }
    }, [match]);

    useEffect(() => {
        fetchItemsData();
    }, [match, fetchItemsData]);

    const onMoreHandler = async () => {
        setMoreButtonLoading(true);
        await fetchItemsData();
        setMoreButtonLoading(false);
    };

    const onCreateHandler = async () => {
        setCreateButtonLoading(true);
        const pollBody = {
            matchId: match.id,
            items: items.map(value => value.id).join(','),
        };
        const respondBody = {
            pollId: match.poll.id,
            entries: respond,
            localName: '',
        };
        await patch('/polls', pollBody);
        await post('polls/respond', respondBody);
        if (match.isLocal) {
            router.push(`/match/local/in-progress/${match.id}`);
        } else {
            router.push(`/match/remote/in-progress/${match.id}`);
        }
    };

    if (!match || !items || items.length === 0) {
        return (
            <AppPage>
                <AppLoadingPage/>
            </AppPage>
        );
    }
    return (
        <AppPage>
            {!match.poll.items &&
            <CreatePoll
                items={items}
                onPush={pushRespondEntry}
                onMore={onMoreHandler}
                onCreate={onCreateHandler}
                moreButtonLoading={moreButtonLoading}
                createButtonLoading={createButtonLoading}
            />}
        </AppPage>
    );
};

export default Poll;