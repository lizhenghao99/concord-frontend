import { Box } from '@chakra-ui/react';

const SideDrawerButton = (props) => {
    const { onClick } = props;
    return (
        <Box onClick={onClick}>
            {props.children}
        </Box>
    );
};

export default SideDrawerButton;