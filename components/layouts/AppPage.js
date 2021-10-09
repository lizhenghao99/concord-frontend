import { Box, Flex, GridItem, Heading, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import ProtectedPage from '../auth/ProtectedPage';
import MultiColumnGrid from './MultiColumnGrid';

const AppPage = (props) => {
    const mobile = useBreakpointValue({ base: true, lg: false });
    const columns = useBreakpointValue({ base: 4, lg: 5, '2xl': 6 });

    useEffect(() => {
        console.log(mobile);
    }, [mobile]);

    const desktopLayout = (
        <MultiColumnGrid
            templateColumns={`repeat(${columns}, 1fr)`}
            mx={0}
            gap={0}
        >
            <GridItem colSpan={1}>
                <Box minH={'100%'} p={0} bg={'black'}>
                    <Flex
                        bg={useColorModeValue('blue.900', 'inherit')}
                        minH="100vh"
                        direction={'column'}
                        alignItems={'center'}
                    >
                    </Flex>
                </Box>
            </GridItem>
            <GridItem colSpan={columns - 1}>
                <Box minH={'100%'} p={0}>
                    <Flex
                        bg={useColorModeValue('gray.50', 'inherit')}
                        minH="100vh"
                        direction={'column'}
                        alignItems={'center'}
                    >
                        {props.children}
                    </Flex>
                </Box>
            </GridItem>
        </MultiColumnGrid>
    );

    const mobileLayout = (
        <Heading>
            {props.children}
        </Heading>
    );

    return (
        <ProtectedPage>
            {!mobile && desktopLayout}
            {mobile && mobileLayout}
        </ProtectedPage>
    );
};

export default AppPage;