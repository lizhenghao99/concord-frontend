import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';

const LinkButton = (props) => {
    const { href, text } = props;
    return (
        <NextLink href={href}>
            <Button colorScheme={'blue'} {...props}>
                {text}
            </Button>
        </NextLink>
    );
};

export default LinkButton;