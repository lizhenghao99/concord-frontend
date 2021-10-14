import { Heading } from '@chakra-ui/react';

const PageHeading = (props) => {
    return (
        <>
            <Heading
                mx={'0.5rem'}
                fontSize={['2xl', '2xl', '3xl', '4xl']}
                textAlign={'center'}
                mt={['0.5rem', '0.5rem', '1rem', '3rem']}
                {...props}
            >
                {props.children}
            </Heading>
        </>
    );
};

export default PageHeading;