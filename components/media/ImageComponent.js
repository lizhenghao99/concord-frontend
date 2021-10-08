import { AspectRatio } from '@chakra-ui/react';
import NextImage from 'next/image';

const ImageComponent = (props) => {
    const { ratio, src, width, height, quality, ...rest } = props;
    return (
        <AspectRatio
            ratio={ratio}
            {...rest}
        >
            <NextImage
                src={src}
                quality={quality}
                layout={'fill'}
                objectFit={'cover'}
                placeholder={'blur'}
            />
        </AspectRatio>
    );
};

export default ImageComponent;