import {
    Box,
    Button,
    CloseButton,
    FormControl,
    FormErrorMessage,
    HStack,
    Input,
    SimpleGrid,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import { Field, FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { sleep } from '../../../../lib/sleep';

const AddLocalNames = (props) => {
    const { submitHandler } = props;
    const columns = useBreakpointValue({ base: 1, lg: 3 });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitError, setIsSubmitError] = useState(false);
    const router = useRouter();
    const validateNames = (values) => {
        const errors = {};
        values.localNames.forEach((value, index) => {
            if (values.localNames.slice(0, index).includes(value) ||
                values.localNames.slice(index + 1).includes(value)) {
                if (!errors.localNames) {
                    errors.localNames = {};
                }
                errors.localNames[index] = 'Duplicate name';
            }
            if (!value) {
                if (!errors.localNames) {
                    errors.localNames = {};
                }
                errors.localNames[index] = 'Required';
            }
        });
        return errors;
    };

    return (
        <Box>
            <Formik
                initialValues={{ localNames: [] }}
                onSubmit={async (values, actions) => {
                    try {
                        const id = await submitHandler(values.localNames);
                        setIsSubmitted(true);
                        setIsSubmitError(false);
                        await sleep(1000);
                        router.push(`/poll/${id}`);
                    } catch (error) {
                        console.log(error.message);
                        setIsSubmitError(true);
                    }
                }}
                validate={validateNames}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <FieldArray name="localNames">
                            {({ insert, remove, push }) => (
                                <VStack spacing={'1rem'}>
                                    <Button
                                        onClick={() => push('')}
                                    >
                                        Add Participant
                                    </Button>
                                    <SimpleGrid columns={columns} spacingX={'1rem'} spacingY={'0.5rem'}>
                                        {values.localNames.length > 0 &&
                                        values.localNames.map((name, index) => (
                                            <Field key={index} name={`localNames.${index}`}>
                                                {({ field, form }) => (
                                                    <FormControl
                                                        key={index}
                                                        isInvalid={form.errors.localNames
                                                        && form.errors.localNames[index]
                                                        && form.touched.localNames
                                                        && form.touched.localNames[index]}
                                                    >
                                                        <VStack spacing={0}>
                                                            {!(form.errors.localNames
                                                                && form.errors.localNames[index]
                                                                && form.touched.localNames
                                                                && form.touched.localNames[index]) &&
                                                            <Box minH={'1.5rem'}/>}
                                                            <FormErrorMessage m={0} h={'1.5rem'}>
                                                                {form.errors.localNames ?
                                                                    form.errors.localNames[index] : null}
                                                            </FormErrorMessage>
                                                            <HStack spacing={'0.5rem'}>
                                                                <Input
                                                                    {...field}
                                                                    id={`localNames.${index}`}
                                                                    placeholder={`Participant ${index + 1}`}
                                                                    isRequired
                                                                />
                                                                <CloseButton
                                                                    tabindex={'-1'}
                                                                    onClick={() => remove(index)}
                                                                />
                                                            </HStack>
                                                        </VStack>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        ))}
                                    </SimpleGrid>
                                    <Box h={'2rem'}/>
                                    <Button
                                        colorScheme={'blue'}
                                        type="submit"
                                        isLoading={isSubmitting}
                                        minW={'10rem'}
                                        fontSize={'xl'}
                                    >
                                        Create
                                    </Button>
                                    {isSubmitted &&
                                    <Text color={'green.500'} align={'center'}>
                                        Successfully created match. Redirecting to poll creation...
                                    </Text>}
                                    {isSubmitError &&
                                    <Text color={'red.500'} align={'center'}>
                                        Please add your poll participants.
                                    </Text>}
                                </VStack>
                            )}
                        </FieldArray>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AddLocalNames;