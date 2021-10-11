import { Box, Flex, Heading, Spacer, Spinner, useColorModeValue } from '@chakra-ui/react';

const LoadingPage = (props) => {
    return (
        <>
            <Flex
                bg={useColorModeValue('gray.50', 'inherit')}
                minH="100vh"
                direction={'column'}
                alignItems={'center'}
            >
                <Spacer/>
                <Heading fontSize={'5rem'} color={'blue.300'}>Concord</Heading>
                <Box minH={'5rem'}/>
                <Spinner color={'blue.200'} size={'xl'}/>
                <Spacer/>
            </Flex>
        </>
    );
};

export default LoadingPage;