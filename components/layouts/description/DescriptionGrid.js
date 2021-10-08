import { Center, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';
import MultiColumnGrid from '../MultiColumnGrid';

const DescriptionGrid = (props) => {
    const { column, contents, ...rest } = props;
    const columns = [1, 1, 1, column, column];
    const templateColumns = columns.map((n) => (
        `repeat(${n}, 1fr)`
    ));
    const fadeDuration = useBreakpointValue({ base: 500, lg: 1000 });


    return (
        <Center>
            <MultiColumnGrid
                templateColumns={templateColumns}
                maxW={'80%'}
                my={'3rem'}
                {...rest}
            >
                {contents.map((content, index) => (
                    <Fade key={index} duration={fadeDuration}>
                        <GridItem
                            colSpan={1}>
                            {content}
                        </GridItem>
                    </Fade>
                ))}
            </MultiColumnGrid>
        </Center>
    );
};

export default DescriptionGrid;