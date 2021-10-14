import { Box, Flex, Heading } from '@chakra-ui/react';
import * as React from 'react';
import concord from '../../public/images/Logo.png';
import ImageComponent from './ImageComponent';

export const Logo = (props) => {
    const { color, boxSize, fontSize, ...rest } = props;
    return (
        <Box {...rest}>
            <Flex alignItems={'center'} justifyContent={'center'}>
                <ImageComponent src={concord} boxSize={boxSize ? boxSize : '3rem'} placeholder={'empty'}/>
                <Box minW={'0.5rem'}/>
                <Heading fontSize={fontSize ? fontSize : '5xl'} color={color ? color : 'blue.300'}>Concord</Heading>
            </Flex>
        </Box>
    );
};
