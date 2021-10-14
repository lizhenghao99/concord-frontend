import { Heading, VStack } from '@chakra-ui/react';
import LinkButton from '../components/input/LinkButton';
import AppPage from '../components/layouts/AppPage';
import { Card } from '../components/layouts/Card';
import TwoColumnGrid from '../components/layouts/TwoColumnGrid';

const Home = () => {

    return (
        <AppPage>
            <VStack mt={'10rem'} alignItems={'center'} spacing={{ base: '2rem', lg: '5rem' }} my={'auto'}>
                <Heading size={'xl'} textAlign={'center'}>
                    Concord helps you and your friends to decide.
                </Heading>
                <TwoColumnGrid maxW={'80%'} spacingX={'5rem'} spacingY={'2rem'}>
                    <Card>
                        <Heading size={'md'}>
                            If your friends are with you and ready to match
                        </Heading>
                        <LinkButton
                            href={'/match/local'}
                            text={'Start a local match'}
                            mt={'3rem'}
                        />
                    </Card>
                    <Card>
                        <Heading size={'md'}>
                            If your friends are away and would respond later
                        </Heading>
                        <LinkButton
                            href={'/match/remote'}
                            text={'Start a remote match'}
                            mt={'3rem'}
                        />
                    </Card>
                </TwoColumnGrid>
            </VStack>
        </AppPage>
    );
};

export default Home;