import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Spacer, Text, VStack } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { post } from '../../../lib/post';
import { PasswordField } from '../PasswordField';
import SignupPasswordField from './SignupPasswordField';
import SignupUsernameField from './SignupUsernameField';

const SignupFormik = (props) => {
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    const [isSignupError, setIsSignupError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isSignupSuccess) {
            setTimeout(() => router.replace('/auth/login'), 1000);
        }
    }, [isSignupSuccess]);

    const signupHandler = async (values, actions) => {
        try {
            const { username, password, rePassword } = values;
            await post('/auth/sign-up', { username, password });
            setIsSignupError(false);
            setIsSignupSuccess(true);
        } catch (error) {
            setIsSignupError(true);
            actions.setSubmitting(false);
        }
    };

    const validateRePassword = (values) => {
        let errors = {};
        if (values.rePassword !== values.password) {
            errors.rePassword = 'Password mismatch';
        }
        return errors;
    };

    return (
        <>
            <Box>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        rePassword: '',
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .min(4, 'Must be at least 4 characters')
                            .max(20, 'Must be less than 20 characters')
                            .required('Required'),
                        password: Yup.string()
                            .min(8, 'Must be at least 8 characters')
                            .max(32, 'Must be less than 32 characters')
                            .required('Required'),
                    })}
                    validate={validateRePassword}
                    onSubmit={(values, actions) => signupHandler(values, actions)}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {(props) => (
                        <Form>
                            <VStack spacing={'2rem'}>
                                <SignupUsernameField
                                    name={'username'}
                                    setFieldError={props.setFieldError}
                                    validateField={props.validateField}
                                    handleChange={props.handleChange}
                                    setFieldValue={props.setFieldValue}
                                    stopValidation={isSignupSuccess}
                                />
                                <SignupPasswordField
                                    name={'password'}
                                    setFieldError={props.setFieldError}
                                    validateField={props.validateField}
                                    handleChange={props.handleChange}
                                    setFieldValue={props.setFieldValue}
                                />
                                <Field name={'rePassword'}>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.rePassword && form.touched.rePassword}>
                                            <Flex m={0}>
                                                <FormLabel htmlFor={'rePassword'}>
                                                    <Text>
                                                        Re-enter Password
                                                    </Text>
                                                </FormLabel>
                                                <Spacer/>
                                                <FormErrorMessage mt={0} mb={'0.5rem'}>
                                                    {form.errors.rePassword}
                                                </FormErrorMessage>
                                            </Flex>
                                            <PasswordField
                                                {...field}
                                                id={'rePassword'}
                                                name={'rePassword'}
                                                placeholder={'Re-enter your password'}
                                                onChange={e => {
                                                    props.handleChange(e);
                                                    validateRePassword(props.values);
                                                }}
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    minW={'100%'}
                                    type="submit"
                                    colorScheme="blue"
                                    size="lg"
                                    fontSize="md"
                                    isLoading={props.isSubmitting || isSignupSuccess}
                                >
                                    Sign up
                                </Button>
                                {!props.isSubmitting && isSignupError &&
                                <Text color={'red.500'}>
                                    Failed to sign up
                                </Text>}
                                {!props.isSubmitting && isSignupSuccess &&
                                <Text color={'green.500'} align={'center'}>
                                    Successfully signed up. Redirecting to login...
                                </Text>}
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </>
    );
};

export default SignupFormik;