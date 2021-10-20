import { SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import AddedParticipantCard from './AddedParticipantCard';

const AddedParticipantsGrid = (props) => {
    const { items, onRemove } = props;
    const columns = useBreakpointValue({ base: 1, lg: 3 });
    return (
        <>
            <SimpleGrid columns={columns} spacingX={'2rem'} spacingY={'1rem'}>
                {items.map((value, index) => (
                    <AddedParticipantCard
                        key={index}
                        value={value}
                        onRemove={onRemove}
                    />
                ))}
            </SimpleGrid>
        </>
    );
};

export default AddedParticipantsGrid;