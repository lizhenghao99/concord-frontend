import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Heading,
    Icon,
    IconButton,
    Spacer,
    Text,
    useBreakpointValue,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { Card } from '../../../layouts/Card';

const RemoteParticipantCard = (props) => {
    const { value, onPush, participants, ...rest } = props;
    const headingFontSize = useBreakpointValue({ base: 'lg', lg: 'xl' });
    const textFontSize = useBreakpointValue({ base: 'md', lg: 'lg' });
    const whiteBg = useColorModeValue('blue.50', 'blue.700');
    const whiteHover = useColorModeValue('blue.100', 'blue.600');
    const [isClicked, setIsClicked] = useState(false);
    const addButtonHandler = async () => {
        onPush(value);
        setIsClicked(true);
    };
    return (
        <Card
            cursor={'pointer'}
            my={'0.5rem'}
            p={'0.5rem'}
            bg={whiteBg}
            _hover={{ bg: whiteHover }}
            transition={'all 0.2s cubic-bezier(.08,.52,.52,1)'}
            {...rest}
        >
            <Flex align={'center'}>
                <Icon as={CgProfile} boxSize={'4rem'}/>
                <Box minW={'3rem'}/>
                <VStack align={'flex-start'}>
                    <Heading fontSize={headingFontSize}>{value.userInfo.nickname}</Heading>
                    <Text fontSize={textFontSize}>{value.username}</Text>
                </VStack>
                <Spacer/>
                {!isClicked && !participants.includes(value) &&
                <IconButton
                    aria-label={'add'}
                    icon={<AddIcon/>}
                    colorScheme={'blue'}
                    onClick={addButtonHandler}
                />}
                {(isClicked || participants.includes(value)) &&
                <IconButton
                    isDisabled={true}
                    aria-label={'added'}
                    icon={<CheckIcon/>}
                    colorScheme={'green'}
                />
                }
            </Flex>
        </Card>
    );
};

export default RemoteParticipantCard;