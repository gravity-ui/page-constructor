import {Button} from '@gravity-ui/uikit';

const ExampleStub = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 24,
            }}
        >
            <h1>This is an example stub</h1>
            <p>It can be anything</p>
            <Button size="xl" view="action">
                Got it!
            </Button>
        </div>
    );
};

export default ExampleStub;
