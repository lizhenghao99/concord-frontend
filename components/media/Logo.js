import { Box, Flex, Heading } from '@chakra-ui/react';
import * as React from 'react';
import concord from '../../public/images/Logo.png';
import ImageComponent from './ImageComponent';

export const Logo = (props) => {
    return (
        <Box {...props}>
            <Flex alignItems={'center'} justifyContent={'center'}>
                <ImageComponent src={concord} boxSize="3rem"/>
                <Box minW={'0.5rem'}/>
                <Heading color={'blue.300'}>Concord</Heading>
            </Flex>
        </Box>
    );
};
