import { Heading, Tag, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { Card } from '../../layouts/Card';

const NotificationCard = (props) => {
    const { value, state, ...rest } = props;
    const headingFontSize = useBreakpointValue({ base: 'lg', lg: 'xl' });
    const textFontSize = useBreakpointValue({ base: 'md', lg: 'lg' });
    const timeFontSize = useBreakpointValue({ base: 'md', lg: 'lg' });
    const greenBg = useColorModeValue('green.100', 'green.900');
    const redBg = useColorModeValue('blue.100', 'blue.900');
    const whiteBg = useColorModeValue('white', 'gray.700');
    const greenHover = useColorModeValue('green.200', 'green.800');
    const redHover = useColorModeValue('blue.200', 'blue.800');
    const whiteHover = useColorModeValue('gray.100', 'gray.600');
    const bgList = [redBg, whiteBg, greenBg];
    const hoverList = [redHover, whiteHover, greenHover];
    const tagText = state === 0 ? 'New' : state === 1 ? 'Read' : 'Responded';
    const tagColor = state === 0 ? 'blue' : state === 1 ? 'gray' : 'green';
    const variant = state === 0 ? 'solid' : 'outline';
    return (
        <Card
            cursor={'pointer'}
            my={'1rem'}
            bg={bgList[state]}
            _hover={{ bg: hoverList[state] }}
            transition={'all 0.2s cubic-bezier(.08,.52,.52,1)'}
            {...rest}
        >
            <Heading fontSize={headingFontSize}>
                {value.title} <Tag variant={variant} colorScheme={tagColor}>{tagText}</Tag>
            </Heading>
            <Text fontSize={textFontSize}>{value.message}</Text>
        </Card>
    );
};

export default NotificationCard;