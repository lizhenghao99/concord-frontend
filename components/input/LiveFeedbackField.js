import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Spacer, Text } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import { useState } from 'react';

const LiveFeedbackField = (props) => {
    const { label, name, placeholder } = props;
    const [field, meta] = useField(props);

    const [didFocus, setDidFocus] = useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = (!!didFocus && field.value.trim().length > 2) || meta.touched;

    return (
        <Field name={name}>
            {({ field, form }) => (
                <FormControl isInvalid={meta.error}>
                    <Flex m={0}>
                        <FormLabel htmlFor={name}>
                            <Text>{label}</Text>
                        </FormLabel>
                        <Spacer/>
                        {showFeedback &&
                        <FormErrorMessage mt={0} mb={'0.5rem'}>
                            {meta.error}
                        </FormErrorMessage>}
                    </Flex>
                    <Input
                        {...field}
                        id={name}
                        placeholder={placeholder}
                        isRequired
                        onFocus={handleFocus}
                    />
                </FormControl>
            )}
        </Field>
    );
};

export default LiveFeedbackField;