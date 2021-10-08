import { Button, chakra, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useContext, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { post } from '../../../lib/post';
import { PasswordField } from './PasswordField';

export const LoginForm = (props) => {
    const [isPosted, setIsPosted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [password, setPassword] = useState(undefined);
    const router = useRouter();
    const { logIn } = useContext(AuthContext);

    const loginHandler = async (username, password) => {
        setIsPosted(true);
        setIsLoading(true);
        try {
            const data = await post('/auth/sign-in', { username, password });
            setIsLoginError(false);
            logIn();
            router.replace('/');
        } catch (error) {
            console.log(error.message);
            setIsLoginError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <chakra.form
            onSubmit={(e) => {
                e.preventDefault();
                loginHandler(e.target.username.value, password);
            }}
            {...props}
        >
            <Stack spacing="6">
                <FormControl id="username">
                    <FormLabel>Email address</FormLabel>
                    <Input name="username" isRequired/>
                </FormControl>
                <PasswordField onChange={(e) => setPassword(e.target.value)}/>
                <Button type="submit" colorScheme="blue" size="lg" fontSize="md" isLoading={isLoading}>
                    Sign in
                </Button>
                {isPosted && !isLoading && isLoginError &&
                <Text>
                    Invalid credentials
                </Text>}
            </Stack>
        </chakra.form>
    );
};
