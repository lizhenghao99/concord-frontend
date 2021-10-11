import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Text, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const ColorModeButton = (props) => {
    const width = useBreakpointValue({ base: '11rem', xl: '12rem' });
    const { pathname } = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button
            onClick={toggleColorMode}
            color={'white'}
            colorScheme={'blue'}
            variant="ghost"
            _hover={{ bg: 'blue.600' }}
            _active={{ bg: 'blue.700' }}
            _focus={{ outline: 'None' }}
            w={width}
            justifyContent={'flex-start'}
            rightIcon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
        >
            <Text mr={'0.5rem'}>
                Color Mode
            </Text>
        </Button>
    );
};

export default ColorModeButton;