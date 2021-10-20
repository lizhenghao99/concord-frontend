import { useRouter } from 'next/router';
import { useContext } from 'react';
import AppLoadingPage from '../../../components/contents/AppLoadingPage';
import RespondPoll from '../../../components/contents/poll/RespondPoll';
import AppPage from '../../../components/layouts/AppPage';
import UserContext from '../../../contexts/UserContext';
import { useGet } from '../../../lib/hooks';

const Respond = (props) => {
    const { query } = useRouter();
    const { data: match, isLoading } = useGet(`/matches/${query.id}`);
    const { user } = useContext(UserContext);

    console.log(JSON.stringify(match));

    if (!match || !user) {
        return (
            <AppPage>
                <AppLoadingPage/>
            </AppPage>
        );
    }

    return (
        <AppPage>
            <RespondPoll match={match} name={query.name} user={user}/>
        </AppPage>
    );
};

export default Respond;