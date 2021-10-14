import { Checkbox, CheckboxGroup, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import videoTags from '../../../../public/resources/video-tags.json';

const VideoTags = (props) => {
    const { onChange } = props;
    const columns = useBreakpointValue({ base: 2, md: 3, lg: 4 });

    return (
        <CheckboxGroup colorScheme={'blue'} onChange={onChange}>
            <SimpleGrid
                columns={columns}
                spacingX={'2rem'}
                spacingY={'1rem'}
            >
                {Object.entries(videoTags).map(([key, value], index) => (
                    <Checkbox
                        key={index}
                        value={value.toString()}>
                        {key}
                    </Checkbox>
                ))}
            </SimpleGrid>
        </CheckboxGroup>
    );
};

export default VideoTags;