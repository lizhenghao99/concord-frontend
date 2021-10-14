import { HStack, useRadioGroup } from '@chakra-ui/react';
import RadioCard from '../../../input/RadioCard';

const MatchTypeRadio = (props) => {
    const options = ['movie', 'series'];
    const { onChange } = props;

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'Create Match',
        defaultValue: 'movie',
        onChange,
    });

    const group = getRootProps();

    return (
        <HStack {...group}>
            {options.map((value, index) => {
                const radio = getRadioProps({ value });
                return (
                    <RadioCard key={value.toLowerCase()} {...radio}>
                        {value[0].toUpperCase() + value.slice(1)}
                    </RadioCard>
                );
            })}
        </HStack>
    );
};

export default MatchTypeRadio;