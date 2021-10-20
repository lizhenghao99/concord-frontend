import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { useState } from 'react';

const AddFriendSearchBox = (props) => {
    const { onSearch } = props;
    const [value, setValue] = useState('');
    const onChange = (e) => setValue(e.target.value);
    const onClickHandler = () => {
        onSearch(value);
    };
    const onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            onClickHandler();
        }
    };
    return (
        <>
            <InputGroup>
                <Input
                    placeholder={'username'}
                    value={value}
                    onChange={onChange}
                    onKeyPress={onKeyPressHandler}
                />
                <InputRightAddon p={0}>
                    <IconButton
                        type={'submit'}
                        aria-label={'search'}
                        icon={<SearchIcon/>}
                        onClick={onClickHandler}
                    />
                </InputRightAddon>
            </InputGroup>
        </>
    );
};

export default AddFriendSearchBox;