import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { decode } from 'html-entities';
import { Card } from '../../layouts/Card';

const VideoCard = (props) => {
    const { video } = props;
    return (
        <Card m={'1rem'}>
            <HStack align={'top'}>
                <Image
                    alt={video.title}
                    src={video.img}
                    fit={'contain'}
                    boxSize={'20rem'}
                />
                <VStack
                    maxW={'20rem'}
                    align={'left'}
                    spacing={'2rem'}
                >
                    <Heading>
                        {decode(video.title)}
                    </Heading>
                    <Heading fontSize={'xl'}>
                        {video.year}
                    </Heading>
                    <Text fontSize={'lg'}>
                        {decode(video.synopsis)}
                    </Text>
                </VStack>
            </HStack>
        </Card>
    )
        ;
};

export default VideoCard;