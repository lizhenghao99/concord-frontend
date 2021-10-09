import { Flex, FormControl, FormErrorMessage, FormLabel, Spacer, Text } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import { useState } from 'react';
import { PasswordField } from '../PasswordField';

const SignupPasswordField = ({ label, helpText, ...props }) => {
    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = (!!didFocus && field.value.trim().length > 2) || meta.touched;

    const validate = (password) => {
        if (!password) {
            props.setFieldError('password', 'Required');
        } else if (password.length < 8) {
            props.setFieldError('password', 'Must be at least 8 characters');
        } else if (password.length > 32) {
            props.setFieldError('password', 'Must be less than 32 characters');
        } else {
            props.setFieldError('password', null);
        }
    };

    return (
        <Field name={'password'} validate={validate}>
            {({ field, form }) => (
                <FormControl isInvalid={meta.error}>
                    <Flex m={0}>
                        <FormLabel htmlFor={'password'}>
                            <Text>
                                Password
                            </Text>
                        </FormLabel>
                        <Spacer/>
                        {showFeedback &&
                        <FormErrorMessage mt={0} mb={'0.5rem'}>
                            {form.errors.password}
                        </FormErrorMessage>}
                    </Flex>
                    <PasswordField
                        {...field}
                        id={'password'}
                        placeholder={'Your password'}
                        isRequired
                        onFocus={handleFocus}
                        onChange={e => {
                            props.handleChange(e);
                            validate(e.target.value);
                        }}
                    />
                </FormControl>
            )}
        </Field>
    );
};

export default SignupPasswordField;