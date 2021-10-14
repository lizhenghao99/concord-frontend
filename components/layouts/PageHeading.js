import { Heading } from '@chakra-ui/react';

const PageHeading = (props) => {
    return (
        <>
            <Heading mt={'3rem'}>
                {props.children}
            </Heading>
        </>
    );
};

export default PageHeading;