import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    IconButton,
    Spacer,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRef } from 'react';
import LogoutButton from '../../auth/logout/LogoutButton';
import ColorModeButton from './ColorModeButton';
import SidebarButton from './SidebarButton';
import SidebarProfileMenu from './SidebarProfileMenu';
import SideDrawerButton from './SideDrawerButton';

const SideDrawer = (props) => {
    const { darkBg } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const buttons = [
        {
            href: '/',
            text: 'Start Matching',
        },
        {
            href: '/history',
            text: 'Matching History',
        }, {
            href: '/notifications',
            text: 'Notifications',
        }, {
            href: '/friends',
            text: 'Friends',
        },
    ];
    return (
        <>
            <Flex minW={'100%'} px={'1rem'} mt={'1rem'} alignSelf={'center'} alignItems={'center'}>
                <Heading color={'blue.500'} size={'lg'}>Concord</Heading>
                <Spacer/>
                <IconButton
                    aria-label={'menu'}
                    icon={<HamburgerIcon/>}
                    onClick={onOpen}
                    ref={btnRef}
                />
            </Flex>
            <Drawer
                isOpen={isOpen}
                placement={'right'}
                onClose={onClose}
                finalFocusRef={btnRef}
                size={'full'}
            >
                <DrawerOverlay/>
                <DrawerContent bg={darkBg}>
                    <DrawerCloseButton boxSize={'2rem'} mr={'0.5rem'} mt={'0.75rem'} color={'white'}/>
                    <DrawerHeader color={'white'}>Dashboard</DrawerHeader>
                    <DrawerBody>
                        <VStack>
                            <NextLink href={'/user'}>
                                <SidebarProfileMenu onClick={onClose}/>
                            </NextLink>
                            <Box minH={'1rem'}/>
                            {buttons.map(({ href, text }, index) => (
                                <SideDrawerButton key={index} onClick={onClose}>
                                    <SidebarButton href={href} text={text}/>
                                </SideDrawerButton>
                            ))}
                            <Box minH={'1rem'}/>
                            <SideDrawerButton onClick={onClose}>
                                <ColorModeButton/>
                            </SideDrawerButton>
                            <SideDrawerButton onClick={onClose}>
                                <LogoutButton
                                    justifyContent={'flex-start'}
                                    variant={'ghost'}
                                    color={'white'}
                                    w={'11rem'}
                                />
                            </SideDrawerButton>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default SideDrawer;