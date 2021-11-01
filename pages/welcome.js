import { Button, Center, Flex, Heading, Text, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';
import { Card } from '../components/layouts/Card';
import { Logo } from '../components/media/Logo';

const Welcome = (props) => {
    const textSize = useBreakpointValue({ base: '1.4rem', lg: '2xl' });
    return (
        <>
            <Flex
                bg={useColorModeValue('gray.50', 'inherit')}
                minH="100vh"
                direction={'column'}
                alignItems={'center'}
                py={'3rem'}
            >
                <Logo
                    mx="auto"
                    h="8"
                    mb={{
                        base: '10',
                        md: '20',
                    }}
                />
                <Heading mb={'3rem'} fontWeight={'extrabold'}>Welcome to Concord</Heading>
                <Card maxW={{ base: '90%', lg: '70%', xl: '50%' }}>
                    <VStack spacing={{ base: '1rem', lg: '3rem' }} alignItems={'flex-start'}
                            mb={{ base: '3rem', lg: '5rem' }}>
                        <Text fontSize={textSize}>
                            Hi there, thanks for visiting <strong>Concord</strong>, a web application that is created to
                            help couples and groups of friends to discover and decide on stuffs to enjoy together.
                        </Text>
                        <Text fontSize={textSize}>
                            Currently, this app supports Netflix movies and series to select from.
                        </Text>
                    </VStack>
                    <Center>
                        <NextLink href={'/auth/login'}>
                            <Button
                                colorScheme={'blue'}
                                size={'lg'}
                            >
                                Launch Concord
                            </Button>
                        </NextLink>
                    </Center>
                </Card>
            </Flex>
        </>
    );
};

export default Welcome;