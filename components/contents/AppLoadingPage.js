import { Box, Heading, Spacer, Spinner } from '@chakra-ui/react';

const AppLoadingPage = (props) => {
    return (
        <>
            <Spacer/>
            <Heading fontSize={'5rem'} color={'blue.300'}>Concord</Heading>
            <Box minH={'5rem'}/>
            <Spinner color={'blue.200'} size={'xl'}/>
            <Spacer/>
        </>
    );
};

export default AppLoadingPage;