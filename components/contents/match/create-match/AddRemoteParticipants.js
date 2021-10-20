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
import RemoteParticipantCard from './RemoteParticipantCard';

const AddRemoteParticipants = (props) => {
    const { items, onAdd, participants } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [partialParticipants, setPartialParticipants] = useState([]);
    const onCloseHandler = () => {
        onClose();
        setPartialParticipants([]);
    };
    const onConfirmClick = () => {
        onAdd(partialParticipants);
        onCloseHandler();
    };
    const onPush = (value) => {
        setPartialParticipants(prevState => {
            prevState.push(value);
            return prevState;
        });
    };
    return (
        <>
            <Button onClick={onOpen}>Add Participants</Button>

            <Modal isOpen={isOpen} onClose={onCloseHandler}>
                <ModalOverlay/>
                <ModalContent ml={{ base: 0, lg: '15rem' }}>
                    <ModalHeader>Invite friends to match</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {items.map((value, index) => (
                            <RemoteParticipantCard
                                key={index}
                                value={value}
                                participants={participants}
                                onPush={onPush}
                            />
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onConfirmClick}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddRemoteParticipants;