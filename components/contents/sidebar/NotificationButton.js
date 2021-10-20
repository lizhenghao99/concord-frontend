import { Box, Tag, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useGet } from '../../../lib/hooks';
import SidebarButton from './SidebarButton';

const NotificationButton = (props) => {
    const { data } = useGet('/notifications/new');
    const { pathname } = useRouter();
    const text = (
        <>
            <Text>
                Notifications
            </Text>
            <Box minW={'0.5rem'}/>
            {pathname !== '/notifications' && data && data.count > 0 &&
            <Tag colorScheme={'blue'} variant={'subtle'}>New</Tag>}
        </>
    );
    return (
        <>
            <SidebarButton
                href={'/notifications'}
                text={text}
            />
        </>
    );
};

export default NotificationButton;