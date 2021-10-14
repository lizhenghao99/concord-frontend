import { Flex, Heading, Spacer, Text, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Card } from '../../layouts/Card';

const HistoryCard = (props) => {
    const { match } = props;
    const headingFontSize = useBreakpointValue({ base: 'lg', lg: 'xl' });
    const textFontSize = useBreakpointValue({ base: 'md', lg: 'lg' });
    const timeFontSize = useBreakpointValue({ base: 'md', lg: 'lg' });

    const href = match.isLocal ?
        match.poll.items ? `/match/local/in-progress/${match.id}` : `/poll/${match.id}`
        : `/match/remote/${match.id}`;
    const greenBg = useColorModeValue('green.100', 'green.900');
    const redBg = useColorModeValue('red.100', 'red.900');
    const whiteBg = useColorModeValue('white', 'gray.700');
    return (
        <NextLink href={href}>
            <Card
                cursor={'pointer'}
                my={'1rem'}
                bg={match.isCompleted ? greenBg : match.poll.items ? whiteBg : redBg}
                {...props}
            >
                <VStack align={'left'} minW={{ base: '15rem', lg: '20rem' }}>
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
        </NextLink>
    );
};

export default HistoryCard;