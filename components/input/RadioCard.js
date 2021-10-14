import { Box, useRadio } from '@chakra-ui/react';

const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _checked={{
                    bg: 'blue.500',
                    color: 'white',
                    borderColor: 'blue.600',
                }}
                _focus={{
                    boxShadow: 'none',
                }}
                px={'2rem'}
                py={'0.7rem'}
                mx={'1rem'}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default RadioCard;