import {Button, Flex, Text} from '@gravity-ui/uikit';

const AdditionContent = () => {
    return (
        <Flex direction="column" gap={2} style={{marginTop: 10}}>
            <Text variant="header-2" style={{fontWeight: 500}}>
                This is an example additional content component form
            </Text>
            <Text variant="body-2">It can be anything</Text>
            <Button size="xl" view="action">
                Got it!
            </Button>
        </Flex>
    );
};

export default AdditionContent;
