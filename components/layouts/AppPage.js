import { Box, Flex, GridItem, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import ProtectedPage from '../auth/ProtectedPage';
import Sidebar from '../contents/Sidebar/Sidebar';
import MultiColumnGrid from './MultiColumnGrid';

const AppPage = (props) => {
    const mobile = useBreakpointValue({ base: true, lg: false });
    const columns = useBreakpointValue({ base: 5, xl: 6, '2xl': 7 });
    const lightBg = useColorModeValue('gray.50', 'gray.800');
    const darkBg = useColorModeValue('blue.500', 'blue.900');

    useEffect(() => {
        console.log(mobile);
    }, [mobile]);

    const desktopLayout = (
        <MultiColumnGrid
            templateColumns={`repeat(${columns}, minmax(0, 1fr))`}
            mx={0}
            gap={0}
        >
            <GridItem colSpan={1}>
                <Box minH={'100%'} p={0} bg={darkBg}>
                    <Sidebar
                        bg={darkBg}
                        minH="100vh"
                        direction={'column'}
                        alignItems={'center'}
                    />
                </Box>
            </GridItem>
            <GridItem colSpan={columns - 1}>
                <Box minH={'100%'} p={0} bg={darkBg}>
                    <Flex
                        bg={lightBg}
                        minH="100vh"
                        direction={'column'}
                        alignItems={'center'}
                        borderLeftRadius={'2xl'}
                    >
                        {props.children}
                    </Flex>
                </Box>
            </GridItem>
        </MultiColumnGrid>
    );

    const mobileLayout = (
        <Box>
            {props.children}
        </Box>
    );

    return (
        <ProtectedPage>
            {!mobile && desktopLayout}
            {mobile && mobileLayout}
        </ProtectedPage>
    );
};

export default AppPage;