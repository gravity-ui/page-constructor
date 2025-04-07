import {Meta, StoryFn} from '@storybook/react';

import {Editor} from '../Editor/Editor';

export default {
    title: 'Editor/Main 2.0',
    component: Editor,
} as Meta;

const DefaultTemplate: StoryFn = (args) => {
    return (
        <div style={{height: '100vh', width: '100vw'}}>
            <Editor {...args} initialUrl={'http://localhost:3000'} />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});

// Default.args = data.default;
