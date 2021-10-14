import { useRouter } from 'next/router';
import AppLoadingPage from '../../../components/contents/AppLoadingPage';
import RespondPoll from '../../../components/contents/poll/RespondPoll';
import AppPage from '../../../components/layouts/AppPage';
import { useGet } from '../../../lib/hooks';

const Respond = (props) => {
    const { query } = useRouter();
    const { data: match, isLoading } = useGet(`/matches/${query.id}`);

    if (!match) {
        return (
            <AppPage>
                <AppLoadingPage/>
            </AppPage>
        );
    }

    return (
        <AppPage>
            <RespondPoll match={match} name={query.name}/>
        </AppPage>
    );
};

export default Respond;