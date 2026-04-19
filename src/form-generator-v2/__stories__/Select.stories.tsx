import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'FormGenerator/Select',
    component: FormGenerator,
    parameters: {
        layout: 'padded',
        resultPanel: true,
    },
} as Meta<typeof FormGenerator>;

const Template: StoryFn<{blockConfig: Fields}> = ({blockConfig}) => {
    const [content, setContent] = useResultPanel<Content>({});
    return (
        <div style={{maxWidth: 600}}>
            <FormGenerator blockConfig={blockConfig} contentConfig={content} onUpdate={setContent} />
        </div>
    );
};

const layoutOptions = [
    {value: 'default', content: 'Default'},
    {value: 'centered', content: 'Centered'},
    {value: 'wide', content: 'Wide'},
];

export const Default = Template.bind({});
Default.args = {
    blockConfig: [
        {
            type: 'select',
            name: 'layout',
            title: 'Layout',
            options: layoutOptions,
        },
    ] as Fields,
};

export const WithClear = Template.bind({});
WithClear.storyName = 'With Clear Button (hasClear)';
WithClear.args = {
    blockConfig: [
        {
            type: 'select',
            name: 'layout',
            title: 'Layout (with clear button)',
            hasClear: true,
            options: layoutOptions,
        },
    ] as Fields,
};
