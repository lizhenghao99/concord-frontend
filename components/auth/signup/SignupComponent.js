import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';
import { Card } from '../../layouts/Card';
import { Logo } from '../../media/Logo';
import SignupFormik from './SignupFormik';

export const SignupComponent = () => (
    <Box
        bg={useColorModeValue('gray.50', 'inherit')}
        minH="100vh"
        py="12"
        px={{
            base: '4',
            lg: '8',
        }}
    >
        <Box maxW="md" mx="auto">
            <Logo
                mx="auto"
                h="8"
                mb={{
                    base: '10',
                    md: '20',
                }}
            />
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Sign up your account
            </Heading>
            <Box mt="4" mb="8" align="center" maxW="md">
            </Box>
            <Card>
                <SignupFormik/>
            </Card>
        </Box>
    </Box>
);
