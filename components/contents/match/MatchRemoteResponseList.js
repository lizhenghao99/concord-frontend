import { SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import MatchRemoteResponsesListItem from './MatchRemoteResponsesListItem';

const MatchRemoteResponseList = (props) => {
    const { match } = props;
    const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const respondedUsers = match.poll.responses.map(value => value.user.id);

    return (
        <SimpleGrid
            columns={match.userNum - 1 > 2 || isMobile ? columns : match.userNum - 1}
            spacingX={'2rem'}
            spacingY={'1rem'}
        >
            {match.remoteParticipants.map((value, index) => (
                <MatchRemoteResponsesListItem
                    key={index}
                    value={value}
                    isResponded={respondedUsers.includes(value.id)}
                    match={match}
                />
            ))}
        </SimpleGrid>
    );
};

export default MatchRemoteResponseList;