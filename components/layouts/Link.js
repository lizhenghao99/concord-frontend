import { chakra, useColorModeValue } from '@chakra-ui/system';
import NextLink from 'next/link';
import * as React from 'react';

export const Link = (props) => (
    <NextLink href={props.href} passHref>
        <chakra.a
            marginStart="1"
            href={props.href}
            color={useColorModeValue('blue.500', 'blue.200')}
            _hover={{
                color: useColorModeValue('blue.600', 'blue.300'),
            }}
            display={{
                base: 'block',
                sm: 'inline',
            }}
            {...props}
        />
    </NextLink>
);
