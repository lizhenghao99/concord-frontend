import { SimpleGrid } from '@chakra-ui/react';

const TwoColumnGrid = (props) => {
    return (
        <SimpleGrid
            mx={'2rem'}
            columns={[1, 1, 1, 2]}
            spacingX={'10rem'}
            spacingY={'0'}
            alignItems={'center'}
            {...props}
        >
            {props.children}
        </SimpleGrid>
    );
};

export default TwoColumnGrid;