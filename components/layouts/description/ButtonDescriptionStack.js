import { Box, Stack } from '@chakra-ui/react';
import ActionButton from '../../navs/ActionButton';
import BodyText from '../../texts/BodyText';
import CaptionText from '../../texts/CaptionText';

const ButtonDescriptionStack = (props) => {
    const { captionText, bodyText, buttonText, href, ...rest } = props;
    return (
        <Stack
            direction={'column'}
            spacing={'1.5rem'}
            align={'center'}
            {...rest}
        >
            <CaptionText
                fontSize={{
                    en: ['4xl', '6xl'],
                    zh: ['3xl', '5xl'],
                }}
            >
                {captionText}
            </CaptionText>
            {bodyText.map((text, index) => (
                <BodyText
                    key={index}
                    fontSize={{
                        en: ['lg', '1.4rem'],
                        zh: ['xl', '1.6rem'],
                    }}
                >
                    {text}
                </BodyText>
            ))}
            <Box h={['0', '0', '0', '0', '2rem']}/>
            <ActionButton
                href={href}
            >
                {buttonText}
            </ActionButton>
        </Stack>
    );
};

export default ButtonDescriptionStack;