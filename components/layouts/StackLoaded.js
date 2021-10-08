import { Stack } from '@chakra-ui/react';
import { useEffect } from 'react';

const StackLoaded = (props) => {
    const { onLoaded, ...rest } = props;

    useEffect(() => {
        onLoaded();
    });

    return (
        <Stack {...rest}>
            {props.children}
        </Stack>
    );
};

export default StackLoaded;