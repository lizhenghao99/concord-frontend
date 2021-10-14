import { Flex, Heading, Spacer, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { Card } from '../../layouts/Card';

const MatchSimpleSummaryCard = (props) => {
    const { match } = props;
    const headingFontSize = useBreakpointValue({ base: 'lg', lg: 'xl' });
    const textFontSize = useBreakpointValue({ base: 'md', lg: 'lg' });
    const timeFontSize = useBreakpointValue({ base: 'md', lg: 'lg' });

    return (
        <>
            <Card {...props}>
                <VStack align={'left'} minW={{ base: '17rem', lg: '20rem' }}>
                    <Flex align={'center'}>
                        <Heading fontSize={headingFontSize}>
                            {match.poll.type[0].toUpperCase() + match.poll.type.slice(1)} Match
                        </Heading>
                        <Spacer/>
                        <Heading fontSize={timeFontSize}>
                            {new Date(match.createAt).toLocaleString([], {
                                dateStyle: 'short',
                                timeStyle: 'short',
                            })}
                        </Heading>
                    </Flex>
                    <Flex>
                        <Text fontSize={textFontSize}>
                            Host: {match.host.userInfo.nickname}
                        </Text>
                        <Spacer/>
                        <Text fontSize={textFontSize}>
                            {match.userNum} members
                        </Text>
                    </Flex>
                </VStack>
            </Card>
        </>
    );
};

export default MatchSimpleSummaryCard;