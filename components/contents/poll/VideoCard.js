import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Fade, Heading, HStack, Image, Link, Skeleton, Text, VStack } from '@chakra-ui/react';
import { decode } from 'html-entities';
import { useState } from 'react';
import { Card } from '../../layouts/Card';

const VideoCard = (props) => {
    const { video, isMobile } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const imageSize = isMobile ? '10rem' : '20rem';
    const descriptionLines = isMobile ? 4 : 5;
    const cardHeight = isMobile ? '23rem' : '26.5rem';
    const maxWidth = isMobile ? '15rem' : '20rem';
    const titleSize = isMobile ? 'lg' : 'xl';
    const description = (
        <Text maxW={maxWidth} noOfLines={descriptionLines}>
            {decode(video.synopsis)}
        </Text>
    );
    return (
        <>
            <Card m={'1rem'} h={cardHeight}>
                <VStack spacing={'1rem'}>
                    <HStack align={'top'}>
                        <Fade in={isLoaded}>
                            <Skeleton isLoaded={isLoaded} startColor={'white'} boxSize={imageSize}
                                      endColor={'gray.100'}>
                                <Image
                                    alt={video.title}
                                    src={video.img}
                                    fit={'contain'}
                                    boxSize={imageSize}
                                    loading={'eager'}
                                    onLoad={() => setIsLoaded(true)}
                                />
                            </Skeleton>
                        </Fade>
                        <VStack
                            align={'left'}
                            spacing={'2rem'}
                            maxW={maxWidth}
                        >
                            <Heading maxW={maxWidth} size={titleSize} noOfLines={3}>
                                {decode(video.title)}
                            </Heading>
                            <Heading fontSize={'xl'}>
                                {video.year}
                            </Heading>
                            {!isMobile && description}
                        </VStack>
                    </HStack>
                    {isMobile && description}
                    <Link
                        isExternal={true}
                        color={'blue.500'}
                        href={`https://www.netflix.com/title/${video.id}`}
                    >
                        Check out on Netflix <ExternalLinkIcon mx="2px"/>
                    </Link>
                </VStack>
            </Card>
        </>
    );
};

export default VideoCard;