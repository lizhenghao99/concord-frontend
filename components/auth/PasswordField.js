import { IconButton, Input, InputGroup, InputRightElement, useDisclosure, useMergeRefs } from '@chakra-ui/react';
import * as React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export const PasswordField = React.forwardRef((props, ref) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = React.useRef(null);
    const mergeRef = useMergeRefs(inputRef, ref);

    const onClickReveal = () => {
        onToggle();
        const input = inputRef.current;

        if (input) {
            input.focus({
                preventScroll: true,
            });
            const length = input.value.length * 2;
            requestAnimationFrame(() => {
                input.setSelectionRange(length, length);
            });
        }
    };

    return (
        <InputGroup>
            <Input
                ref={mergeRef}
                name="password"
                type={isOpen ? 'text' : 'password'}
                autoComplete="current-password"
                isRequired
                {...props}
            />
            <InputRightElement>
                <IconButton
                    tabIndex={'-1'}
                    bg="transparent !important"
                    variant="ghost"
                    aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                    icon={isOpen ? <HiEyeOff/> : <HiEye/>}
                    onClick={onClickReveal}
                />
            </InputRightElement>
        </InputGroup>
    );
});
PasswordField.displayName = 'PasswordField';
