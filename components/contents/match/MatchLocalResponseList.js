import { SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import MatchLocalResponseListItem from './MatchLocalResponseListItem';

const MatchLocalResponseList = (props) => {
    const { match } = props;
    const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const respondedNames = match.poll.responses.map(value => value.localName);

    return (
        <SimpleGrid
            columns={match.userNum - 1 > 2 || isMobile ? columns : match.userNum - 1}
            spacingX={'2rem'}
            spacingY={'1rem'}
        >
            {match.localParticipants.split(',').map((value, index) => (
                <MatchLocalResponseListItem
                    key={index}
                    value={value}
                    isResponded={respondedNames.includes(value)}
                    match={match}
                />
            ))}
        </SimpleGrid>
    );
};

export default MatchLocalResponseList;