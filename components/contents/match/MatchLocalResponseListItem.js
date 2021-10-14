import { CheckIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Card } from '../../layouts/Card';

const MatchLocalResponseListItem = (props) => {
    const { value, isResponded, match } = props;
    const router = useRouter();
    const onClickHandler = () => {
        router.push(`/poll/respond/${match.id}?name=${value}`);
    };
    return (
        <Card py={'1rem'} px={'1rem'}>
            <Flex align={'center'} minW={'15rem'} h={'3rem'}>
                <Text fontSize={'lg'}>
                    {value}
                </Text>
                <Spacer/>
                {isResponded ?
                    <Box>
                        <CheckIcon boxSize={'1.5rem'}/>
                    </Box> :
                    <Button onClick={onClickHandler}>
                        Respond
                    </Button>
                }
            </Flex>
        </Card>
    );
};

export default MatchLocalResponseListItem;