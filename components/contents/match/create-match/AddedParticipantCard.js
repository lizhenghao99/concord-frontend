import { CloseIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { Card } from '../../../layouts/Card';

const AddedParticipantCard = (props) => {
    const { value, onRemove } = props;
    const removeButtonHandler = () => {
        onRemove(value);
    };
    return (
        <Card px={'1rem'} py={'0.5rem'} minW={'15rem'}>
            <Flex align={'center'}>
                <Text>{value.userInfo.nickname}</Text>
                <Spacer/>
                <IconButton
                    aria-label={'remove'}
                    icon={<CloseIcon/>}
                    onClick={removeButtonHandler}
                />
            </Flex>
        </Card>
    );
};

export default AddedParticipantCard;