import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import UserContext from '../../../contexts/UserContext';
import { patch } from '../../../lib/patch';
import LiveFeedbackField from '../../input/LiveFeedbackField';

const ProfileFormik = (props) => {
    const [isUpdateError, setIsUpdateError] = useState(false);
    const { user } = useContext(UserContext);
    const router = useRouter();

    const updateHandler = async (values, actions) => {
        try {
            await patch('/users', values);
            setIsUpdateError(false);
            actions.setSubmitting(false);
            router.reload();
        } catch (error) {
            setIsUpdateError(true);
            actions.setSubmitting(false);
        }
    };

    return (
        <>
            <Box {...props}>
                <Formik
                    initialValues={{
                        nickname: user.userInfo.nickname,
                    }}
                    validationSchema={Yup.object({
                        nickname: Yup.string()
                            .max(16, 'Must be less than 16 characters')
                            .required('Required'),
                    })}
                    onSubmit={(values, actions) => updateHandler(values, actions)}
                >
                    {(props) => (
                        <Form>
                            <VStack spacing={'2rem'}>
                                <LiveFeedbackField
                                    name={'nickname'}
                                    label={'Nickname'}
                                    placeholder={'Your nickname'}
                                />
                                <Button
                                    minW={'100%'}
                                    type="submit"
                                    colorScheme="blue"
                                    size="lg"
                                    fontSize="md"
                                    isLoading={props.isSubmitting}
                                >
                                    Update
                                </Button>
                                {!props.isSubmitting && isUpdateError &&
                                <Text color={'red.500'}>
                                    Failed to update user profile
                                </Text>}
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </>
    );
};

export default ProfileFormik;