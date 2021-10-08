import { Center } from '@chakra-ui/react';
import StackSkeleton from './StackSkeleton';

const TextBlock = (props) => {
    return (
        <Center>
            <StackSkeleton
                mx={['2rem', '5rem']}
                my={['2rem', '5rem']}
                maxW={'60rem'}
                align={'left'}
                {...props}
            >
                {props.children}
            </StackSkeleton>
        </Center>
    );
};

export default TextBlock;