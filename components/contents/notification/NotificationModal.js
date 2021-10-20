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
import { useEffect, useState } from 'react';
import { get } from '../../../lib/get';
import { post } from '../../../lib/post';
import NotificationCard from './NotificationCard';
import OptOutAlert from './OptOutAlert';

const NotificationModal = (props) => {
        const { value, user, router } = props;
        const { isOpen, onOpen, onClose } = useDisclosure();
        const size = useBreakpointValue({ base: 'md', lg: 'lg' });
        const [notificationState, setNotificationState] = useState(value.state);
        const tagText = notificationState === 0 ? 'New' : notificationState === 1 ? 'Read' : 'Responded';
        const tagColor = notificationState === 0 ? 'blue' : notificationState === 1 ? 'gray' : 'green';
        const [isAlertOpen, setIsAlertOpen] = useState(false);

        useEffect(() => {
            const setState = async () => {
                if (value.type === 'poll-start') {
                    const data = await get(`/polls/${value.extras}`);
                    const respondedUsers = data.responses.map(value => value.user.id);
                    if (respondedUsers.includes(user.id)) {
                        setNotificationState(2);
                    }
                }
            };
            setState();
        }, [value, user.id]);

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

        const setResponded = async () => {
            await post('/notifications/state', {
                notificationId: value.id,
                state: 2,
            });
            setNotificationState(2);
            onClose();
        };

        const notificationType = {
            'friend-request': {
                acceptText: 'Accept Request',
                rejectText: 'Reject Request',
                requiresResponse: true,
                onAccept: async () => {
                    await post('/users/friends/accept', {
                        notificationId: value.id,
                    });
                    await setResponded();
                },
                onReject: async () => {
                    await setResponded();
                },
            },
            'friend-accept': {
                acceptText: 'Close',
                rejectText: 'Close',
                requiresResponse: false,
                onAccept: async () => {
                    await setResponded();
                },
                onReject: async () => {
                    await setResponded();
                },
            },
            'poll-start': {
                acceptText: 'Respond',
                rejectText: 'Opt Out',
                requiresResponse: true,
                onAccept: async () => {
                    await onCloseHandler();
                    router.push(`/poll/respond/${value.extras}?name=${user.userInfo.nickname}`);
                },
                onReject: async () => {
                    setIsAlertOpen(true);
                },
            },
            'poll-result': {
                acceptText: 'Check Result',
                rejectText: 'Close',
                requiresResponse: false,
                onAccept: async () => {
                    await onCloseHandler();
                    router.push(`/result/${value.extras}`);
                },
                onReject: async () => {
                    await onCloseHandler();
                },
            },
        };


        return (
            <>
                <NotificationCard
                    onClick={onOpen}
                    state={notificationState}
                    requiresResponse={notificationType[value.type].requiresResponse}
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
                <OptOutAlert
                    isOpen={isAlertOpen}
                    setIsOpen={setIsAlertOpen}
                    closeModal={onCloseHandler}
                    value={value}
                />
            </>
        );
    }
;

export default NotificationModal;