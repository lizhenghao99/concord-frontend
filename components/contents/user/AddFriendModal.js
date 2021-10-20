import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { get } from '../../../lib/get';
import AddFriendSearchBox from './AddFriendSearchBox';
import SearchResultCard from './SearchResultCard';

const AddFriendModal = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [items, setItems] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const onSearch = async (value) => {
        if (value) {
            const data = await get(`/users/search/${value}`);
            setItems(data);
        } else {
            setItems([]);
        }
        setIsSearched(true);
    };
    const onCloseHandler = () => {
        setIsSearched(false);
        setItems([]);
        onClose();
    };
    return (
        <>
            <Button onClick={onOpen} mb={'0.5rem'}>Add Friend</Button>

            <Modal isOpen={isOpen} onClose={onCloseHandler}>
                <ModalOverlay/>
                <ModalContent ml={{ base: 0, lg: '15rem' }}>
                    <ModalHeader>Search users by username</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody mb={'1rem'}>
                        <AddFriendSearchBox onSearch={onSearch}/>
                        <Box minH={'1rem'}/>
                        {isSearched && items.length === 0 &&
                        <Text color={'red.500'}>
                            No user found
                        </Text>
                        }
                        {items.map((value, index) => (
                            <SearchResultCard
                                key={index}
                                value={value}
                            />
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddFriendModal;