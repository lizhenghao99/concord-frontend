import {
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    SkeletonCircle,
    SkeletonText,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext } from 'react';
import { CgProfile } from 'react-icons/cg';
import UserContext from '../../../contexts/UserContext';
import LogoutMenuItem from '../../auth/logout/LogoutMenuItem';

const SidebarProfileMenu = (props) => {
    const width = useBreakpointValue({ base: '11rem', xl: '12rem' });
    const picRightMargin = useBreakpointValue({ base: '0.25rem', xl: '0.5rem' });
    const picSize = useBreakpointValue({ base: '2rem', xl: '2.5rem' });
    const nameSpacing = useBreakpointValue({ base: '0.1rem', xl: '0.3rem' });
    const nameFontSize = useBreakpointValue({ base: 'sm', xl: 'md' });
    const height = '4rem';
    const { user } = useContext(UserContext);

    const skeleton = (
        <HStack h={height} w={width}>
            <SkeletonCircle size={picSize} mr={picRightMargin}/>
            <SkeletonText minW={'7rem'} noOfLines={2} spacing={'4'}/>
        </HStack>
    );

    return (
        <>
            {!user && skeleton}
            {user &&
            <Menu autoSelect={false}>
                <MenuButton
                    as={Button}
                    color={'white'}
                    colorScheme={'blue'}
                    variant="ghost"
                    _hover={{ bg: 'blue.600' }}
                    _active={{ bg: 'blue.800' }}
                    _focus={{ outline: 'None' }}
                    w={width}
                    minH={height}
                    {...props}
                >
                    <Flex direction={'row'} alignItems={'center'}>
                        <Icon as={CgProfile} boxSize={picSize} mr={picRightMargin}/>
                        <Flex direction={'column'}>
                            <Text align={'left'} fontSize={nameFontSize}>
                                {user.userInfo.nickname}
                            </Text>
                            <Box minH={nameSpacing}/>
                            <Text align={'left'} fontSize={'xs'}>
                                {user.username}
                            </Text>
                        </Flex>
                    </Flex>
                </MenuButton>
                <MenuList bg={'blue.800'} borderColor={'blue.800'} minW={width}>
                    <NextLink href={'/user'}>
                        <MenuItem>Profile settings</MenuItem>
                    </NextLink>
                    <LogoutMenuItem/>
                </MenuList>
            </Menu>
            }
        </>
    );
};

export default SidebarProfileMenu;