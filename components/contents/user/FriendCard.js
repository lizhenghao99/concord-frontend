import { Heading, HStack, Icon, Text, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg';
import { Card } from '../../layouts/Card';

const FriendCard = (props) => {
    const { value, ...rest } = props;
    const headingFontSize = useBreakpointValue({ base: 'lg', lg: 'xl' });
    const textFontSize = useBreakpointValue({ base: 'md', lg: 'lg' });
    const whiteBg = useColorModeValue('white', 'gray.700');
    const whiteHover = useColorModeValue('gray.100', 'gray.600');
    return (
        <Card
            cursor={'pointer'}
            my={'1rem'}
            bg={whiteBg}
            _hover={{ bg: whiteHover }}
            transition={'all 0.2s cubic-bezier(.08,.52,.52,1)'}
            {...rest}
        >
            <HStack spacing={'3rem'} align={'center'}>
                <Icon as={CgProfile} boxSize={'4rem'}/>
                <VStack align={'flex-start'}>
                    <Heading fontSize={headingFontSize}>{value.userInfo.nickname}</Heading>
                    <Text fontSize={textFontSize}>{value.username}</Text>
                </VStack>
            </HStack>
        </Card>
    );
};

export default FriendCard;