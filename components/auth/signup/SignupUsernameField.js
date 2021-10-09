import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, Spacer, Text } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import { useState } from 'react';
import { get } from '../../../lib/get';

const SignupUsernameField = ({ label, helpText, ...props }) => {
    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = ((!!didFocus && field.value.trim().length > 2) || meta.touched) && !props.stopValidation;

    const [timeoutId, setTimeoutId] = useState(0);

    const checkUsernameSchema = (username) => {
        if (!username) {
            props.setFieldError('username', 'Required');
        } else if (username.length < 4) {
            props.setFieldError('username', 'Must be at least 4 characters');
        } else if (username.length > 20) {
            props.setFieldError('username', 'Must be less than 20 characters');
        } else {
            props.setFieldError('username', null);
        }
    };

    const checkDuplicateUsername = async (username) => {
        try {
            const data = await get(`/auth/duplicate/${username}`);
            if (data['isDuplicate'] === 1) {
                console.log('duplicate');
                props.setFieldError('username', 'Username is taken');
            } else {
                props.setFieldError('username', null);
            }
        } catch (error) {
        }
    };

    const validate = (username) => {
        checkUsernameSchema(username);
        if (!username) return;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setTimeoutId(setTimeout(checkDuplicateUsername.bind(null, username), 500));
    };

    return (
        <Field name={'username'} validate={props.stopValidation ? null : validate}>
            {({ field, form }) => (
                <FormControl isInvalid={props.stopValidation ? null : meta.error}>
                    <Flex m={0}>
                        <FormLabel htmlFor={'username'}>
                            <Text>Username</Text>
                        </FormLabel>
                        <Spacer/>

                        <Spacer/>
                        {showFeedback &&
                        <FormErrorMessage mt={0} mb={'0.5rem'}>
                            {meta.error}
                        </FormErrorMessage>}
                    </Flex>
                    <Input
                        {...field}
                        id={'username'}
                        placeholder={'Your username'}
                        isRequired
                        onFocus={handleFocus}
                        onChange={e => {
                            props.handleChange(e);
                            validate(e.target.value);
                        }}
                    />
                    <Box>{helpText}</Box>
                </FormControl>
            )}
        </Field>
    );
};

export default SignupUsernameField;