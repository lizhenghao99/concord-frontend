import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Tag,
    Text,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { post } from '../../../lib/post';
import NotificationCard from './NotificationCard';

const NotificationModal = (props) => {
        const { value } = props;
        const { isOpen, onOpen, onClose } = useDisclosure();
        const size = useBreakpointValue({ base: 'md', lg: 'lg' });
        const [notificationState, setNotificationState] = useState(value.state);
        const tagText = notificationState === 0 ? 'New' : notificationState === 1 ? 'Read' : 'Responded';
        const tagColor = notificationState === 0 ? 'blue' : notificationState === 1 ? 'gray' : 'green';

        const onCloseHandler = async () => {
            onClose();
            if (notificationState === 0) {
                await post('/notifications/state', {
                    notificationId: value.id,
                    state: 1,
                });
                setNotificationState(1);
            }
        };

        const notificationType = {
            'friend-request': {
                acceptText: 'Accept Request',
                rejectText: 'Reject Request',
                onAccept: async () => {
                    await post('/users/friends/accept', {
                        notificationId: value.id,
                    });
                    await post('/notifications/state', {
                        notificationId: value.id,
                        state: 2,
                    });
                    setNotificationState(2);
                    onClose();
                },
                onReject: async () => {
                    await post('/notifications/state', {
                        notificationId: value.id,
                        state: 2,
                    });
                    setNotificationState(2);
                    onClose();
                },
            },
            'friend-accept': {
                acceptText: 'Close',
                rejectText: 'Close',
                onAccept: async () => {
                    await post('/notifications/state', {
                        notificationId: value.id,
                        state: 2,
                    });
                    setNotificationState(2);
                    onClose();
                },
                onReject: async () => {
                    await post('/notifications/state', {
                        notificationId: value.id,
                        state: 2,
                    });
                    setNotificationState(2);
                    onClose();
                },
            },
        };


        return (
            <>
                <NotificationCard
                    onClick={onOpen}
                    state={notificationState}
                    {...props}
                />

                <Modal isOpen={isOpen} onClose={onCloseHandler} size={size}>
                    <ModalOverlay/>
                    <ModalContent ml={{ base: 0, lg: '15rem' }}>
                        <ModalHeader>
                            {value.title} <Tag variant={'subtle'} colorScheme={tagColor}>{tagText}</Tag>
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody mb={'2rem'}>
                            <Text>{value.message}</Text>
                        </ModalBody>

                        {value.type !== 'friend-accept' &&
                        <ModalFooter>
                            <Button
                                variant="ghost"
                                colorScheme={'red'}
                                onClick={notificationType[value.type].onReject}
                                isDisabled={notificationState === 2}
                            >
                                {notificationType[value.type].rejectText}
                            </Button>
                            <Spacer/>
                            <Button
                                colorScheme="green"
                                mr={3}
                                onClick={notificationType[value.type].onAccept}
                                isDisabled={notificationState === 2}
                            >
                                {notificationType[value.type].acceptText}
                            </Button>
                        </ModalFooter>
                        }
                    </ModalContent>
                </Modal>
            </>
        );
    }
;

export default NotificationModal;