import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'FormGenerator/Divider',
    component: FormGenerator,
    parameters: {
        layout: 'padded',
        resultPanel: true,
        docs: {
            description: {
                component:
                    'A horizontal divider for visual separation between form fields. ' +
                    'Has no `name` and writes nothing to content. Supports `when` like any other field.',
            },
        },
    },
} as Meta<typeof FormGenerator>;

const Template: StoryFn<{blockConfig: Fields}> = ({blockConfig}) => {
    const [content, setContent] = useResultPanel<Content>({});
    return (
        <div style={{maxWidth: 600}}>
            <FormGenerator
                blockConfig={blockConfig}
                contentConfig={content}
                onUpdate={setContent}
            />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    blockConfig: [
        {
            type: 'textInput',
            name: 'title',
            title: 'Title',
        },
        {
            type: 'divider',
        },
        {
            type: 'textArea',
            name: 'description',
            title: 'Description',
        },
    ] as Fields,
};

export const BetweenSections = Template.bind({});
BetweenSections.storyName = 'Between sections';
BetweenSections.args = {
    blockConfig: [
        {
            type: 'text',
            text: 'General settings',
            color: 'secondary',
        },
        {
            type: 'textInput',
            name: 'title',
            title: 'Title',
        },
        {
            type: 'divider',
        },
        {
            type: 'text',
            text: 'Appearance',
            color: 'secondary',
        },
        {
            type: 'colorInput',
            name: 'backgroundColor',
            title: 'Background',
        },
        {
            type: 'colorInput',
            name: 'textColor',
            title: 'Text color',
        },
    ] as Fields,
};

export const Conditional = Template.bind({});
Conditional.args = {
    blockConfig: [
        {
            type: 'switch',
            name: 'showAdvanced',
            title: 'Show advanced settings',
        },
        {
            type: 'textInput',
            name: 'title',
            title: 'Title',
        },
        {
            type: 'divider',
            when: [{field: 'showAdvanced', operator: '===', value: true}],
        },
        {
            type: 'textInput',
            name: 'customClass',
            title: 'Custom CSS class',
            when: [{field: 'showAdvanced', operator: '===', value: true}],
        },
    ] as Fields,
};
