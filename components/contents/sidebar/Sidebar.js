import { Box, Flex, Spacer, useBreakpointValue, VStack } from '@chakra-ui/react';
import { Logo } from '../../media/Logo';
import ColorModeButton from './ColorModeButton';
import NotificationButton from './NotificationButton';
import SidebarButton from './SidebarButton';
import SidebarProfileMenu from './SidebarProfileMenu';

const Sidebar = (props) => {
    const boxSize = useBreakpointValue({ base: '2rem', lg: '2.5rem', xl: '3rem' });
    const fontSize = useBreakpointValue({ base: 'xl', lg: '3xl', xl: '4xl' });
    return (
        <Flex direction={'column'} {...props}>
            <VStack my={'1rem'} mx={'auto'} spacing={'1rem'} alignItems={'center'}>
                <Logo color={'white'} boxSize={boxSize} fontSize={fontSize}/>
                <Box minH={'0.5rem'}/>
                <SidebarProfileMenu/>
                <Box minH={'0.5rem'}/>
                <SidebarButton href={'/'} text={'Start Matching'}/>
                <SidebarButton href={'/history/hosted'} text={'Hosted Matches'}/>
                <SidebarButton href={'/history/participated'} text={'Participated Matches'}/>
                <SidebarButton href={'/friends'} text={'Friends'}/>
                <NotificationButton/>
            </VStack>
            <Spacer/>
            <ColorModeButton/>
            <Box minH={'3rem'}/>
        </Flex>
    );
};

export default Sidebar;