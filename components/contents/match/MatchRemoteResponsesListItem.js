import { CheckIcon } from '@chakra-ui/icons';
import { Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { Card } from '../../layouts/Card';

const MatchRemoteResponsesListItem = (props) => {
    const { value, isResponded } = props;
    return (
        <Card py={'1rem'} px={'1rem'}>
            <Flex align={'center'} minW={'15rem'} h={'3rem'}>
                <Text fontSize={'lg'}>
                    {value.userInfo.nickname}
                </Text>
                <Spacer/>
                {isResponded ?
                    <CheckIcon color={'green.500'} boxSize={'1.5rem'}/> :
                    <Icon color={'blue.500'} as={BsThreeDots} boxSize={'1.5rem'}/>
                }
            </Flex>
        </Card>
    );
};

export default MatchRemoteResponsesListItem;