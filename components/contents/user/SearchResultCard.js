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
import { post } from '../../../lib/post';
import { Card } from '../../layouts/Card';

const SearchResultCard = (props) => {
    const { value, ...rest } = props;
    const headingFontSize = useBreakpointValue({ base: 'lg', lg: 'xl' });
    const textFontSize = useBreakpointValue({ base: 'md', lg: 'lg' });
    const whiteBg = useColorModeValue('blue.50', 'blue.700');
    const whiteHover = useColorModeValue('blue.100', 'blue.600');
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const addButtonHandler = async () => {
        setIsLoading(true);
        try {
            await post('/users/friends/request', {
                userId: value.user.id,
            });
        } catch (error) {
            // do nothing
        }
        setIsLoading(false);
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
                    <Heading fontSize={headingFontSize}>{value.user.userInfo.nickname}</Heading>
                    <Text fontSize={textFontSize}>{value.user.username}</Text>
                </VStack>
                <Spacer/>
                {value.isFriend === 0 && !isClicked &&
                <IconButton
                    isLoading={isLoading}
                    aria-label={'add'}
                    icon={<AddIcon/>}
                    colorScheme={'blue'}
                    onClick={addButtonHandler}
                />
                }
                {(value.isFriend === 1 || isClicked) &&
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

export default SearchResultCard;