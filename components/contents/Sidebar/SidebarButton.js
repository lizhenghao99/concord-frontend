import { Button, useBreakpointValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const SidebarButton = (props) => {
    const { href, text } = props;
    const width = useBreakpointValue({ base: '11rem', xl: '12rem' });
    const { pathname } = useRouter();
    return (
        <NextLink href={props.href}>
            <Button
                color={'white'}
                colorScheme={'blue'}
                variant="ghost"
                _hover={{ bg: 'blue.600' }}
                _active={{ bg: 'blue.700' }}
                _focus={{ outline: 'None' }}
                w={width}
                justifyContent={'flex-start'}
                isActive={pathname === href}
            >
                {text}
            </Button>
        </NextLink>
    );
};

export default SidebarButton;