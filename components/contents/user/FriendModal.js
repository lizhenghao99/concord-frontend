import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import DeleteFriendAlert from './DeleteFriendAlert';
import FriendCard from './FriendCard';

const FriendModal = (props) => {
    const { value } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const deleteHandler = async () => {
        setIsAlertOpen(true);
    };

    return (
        <>
            <FriendCard
                onClick={onOpen}
                {...props}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent ml={{ base: 0, lg: '15rem' }}>
                    <ModalHeader>{value.userInfo.nickname}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {value.username}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={deleteHandler}>
                            Delete Friend
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <DeleteFriendAlert
                isOpen={isAlertOpen}
                setIsOpen={setIsAlertOpen}
                closeModal={onClose}
                value={value}
            />
        </>
    );
};

export default FriendModal;