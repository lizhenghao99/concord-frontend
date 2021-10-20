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
import { del } from '../../../lib/delete';
import { sleep } from '../../../lib/sleep';

const DeleteFriendAlert = (props) => {
    const { isOpen, setIsOpen, closeModal, value } = props;
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
        await del(`/users/friends/${value.id}`);
        await sleep(500);
        setIsLoading(false);
        router.reload();
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
                            Delete Friend
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Text>
                                Are you sure you want to delete <strong>{value.userInfo.nickname}</strong>?
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
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteFriendAlert;
