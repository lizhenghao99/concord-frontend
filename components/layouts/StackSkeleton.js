import { Skeleton } from '@chakra-ui/react';
import { useState } from 'react';
import StackLoaded from './StackLoaded';

const StackSkeleton = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <Skeleton isLoaded={isLoaded} fadeDuration={1} startColor={'white'} endColor={'gray.300'}>
            <StackLoaded
                onLoaded={() => setIsLoaded(true)}
                {...props}
            >
                {props.children}
            </StackLoaded>
        </Skeleton>
    );
};

export default StackSkeleton;