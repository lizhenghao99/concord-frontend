import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { post } from '../../../lib/post';
import { sleep } from '../../../lib/sleep';

const OptOutAlert = (props) => {
    const { isOpen, setIsOpen, closeModal, value, onRespond } = props;
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onCloseHandler = () => {
        onClose();
        closeModal();
    };

    const onDeleteHandler = async () => {
        setIsLoading(true);
        await post(`/polls/opt-out`, {
            matchId: value.extras,
        });
        await sleep(500);
        await onRespond();
        setIsLoading(false);
        router.push(`/match/remote/in-progress/${value.extras}`);
    };

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onCloseHandler}
                size={'xl'}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent ml={{ base: 0, lg: '15rem' }}>
                        <AlertDialogHeader fontSize="xl" fontWeight="bold">
                            Opt Out of Match
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Text>
                                Are you sure you want to opt out of this match? <br/>
                                By doing so, you will be ignored during the matching process.
                            </Text>
                            <Text>
                                <strong>You can&apos;t undo this action afterwards.</strong>
                            </Text>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseHandler}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onDeleteHandler} ml={3} isLoading={isLoading}>
                                Opt Out
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default OptOutAlert;