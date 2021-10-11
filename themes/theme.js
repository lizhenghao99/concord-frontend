import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: true,
    components: {
        Menu: {
            parts: ['menu', 'item'],
            baseStyle: {
                item: {
                    color: 'white',
                    bg: 'blue.800',
                    _hover: { bg: 'blue.700' },
                    _focus: { bg: 'blue.700' },
                },
            },
        },
    },
});

export default theme;