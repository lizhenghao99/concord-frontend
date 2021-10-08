import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Spacer,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import AuthContext from '../../../contexts/AuthContext';
import { post } from '../../../lib/post';
import { PasswordField } from './PasswordField';

const LoginFormik = (props) => {
    const [isLoginError, setIsLoginError] = useState(false);
    const [password, setPassword] = useState(undefined);
    const router = useRouter();
    const { logIn } = useContext(AuthContext);
    const linkColor = useColorModeValue('blue.600', 'blue.200');

    const loginHandler = async (values, actions) => {
        try {
            const { username, password } = values;
            const data = await post('/auth/sign-in', { username, password });
            setIsLoginError(false);
            actions.setSubmitting(false);
            logIn();
            router.replace('/');
        } catch (error) {
            actions.setSubmitting(false);
            setIsLoginError(true);
        }
    };
    return (
        <>
            <Box>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Required'),
                        password: Yup.string().required('Required'),
                    })}
                    onSubmit={(values, actions) => loginHandler(values, actions)}
                >
                    {(props) => (
                        <Form>
                            <VStack spacing={'2rem'}>
                                <Field name={'username'}>
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.username && form.touched.username}
                                        >
                                            <Flex m={0}>
                                                <FormLabel htmlFor={'username'}>
                                                    <Text>Username</Text>
                                                </FormLabel>
                                                <Spacer/>
                                                <FormErrorMessage mt={0} mb={'0.5rem'}>
                                                    {form.errors.username}
                                                </FormErrorMessage>
                                            </Flex>
                                            <Input{...field} id={'username'} placeholder={'Your username'} isRequired/>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name={'password'}>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.password && form.touched.password}>
                                            <Flex m={0}>
                                                <FormLabel htmlFor={'password'}>
                                                    <Text>
                                                        Password
                                                    </Text>
                                                </FormLabel>
                                                <Spacer/>
                                                <FormErrorMessage mt={0} mb={'0.5rem'}>
                                                    {form.errors.password}
                                                </FormErrorMessage>
                                            </Flex>
                                            <PasswordField {...field} id={'username'} placeholder={'Your username'}/>
                                            <Box minH={'0.25rem'}/>
                                            <Box
                                                as="a"
                                                color={linkColor}
                                                fontWeight="semibold"
                                                fontSize="sm"
                                            >
                                                Forgot Password?
                                            </Box>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    minW={'100%'}
                                    type="submit"
                                    colorScheme="blue"
                                    size="lg"
                                    fontSize="md"
                                    isLoading={props.isSubmitting}
                                >
                                    Sign in
                                </Button>
                                {!props.isSubmitting && isLoginError &&
                                <Text>
                                    Invalid credentials
                                </Text>}
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </>
    );
};

export default LoginFormik;