import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'FormGenerator/Text',
    component: FormGenerator,
    parameters: {
        layout: 'padded',
        resultPanel: true,
        docs: {
            description: {
                component:
                    'A read-only text label rendered inline among other fields. ' +
                    'Useful for hints, section descriptions, or warnings. ' +
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
            type: 'text',
            text: 'Fill in the fields below to configure the block.',
        },
        {
            type: 'textInput',
            name: 'title',
            title: 'Title',
        },
        {
            type: 'textArea',
            name: 'description',
            title: 'Description',
        },
    ] as Fields,
};

export const WithInfoLevel = Template.bind({});
WithInfoLevel.storyName = 'Info level';
WithInfoLevel.args = {
    blockConfig: [
        {
            type: 'text',
            text: 'Analytics data is collected anonymously.',
            level: 'info',
        },
        {
            type: 'switch',
            name: 'analytics.enabled',
            title: 'Enable Analytics',
        },
        {
            type: 'textInput',
            name: 'analytics.id',
            title: 'Tracking ID',
        },
    ] as Fields,
};

export const WithDangerLevel = Template.bind({});
WithDangerLevel.storyName = 'Danger level';
WithDangerLevel.args = {
    blockConfig: [
        {
            type: 'text',
            text: 'Changes here may break your page layout.',
            level: 'danger',
        },
        {
            type: 'textInput',
            name: 'customCss',
            title: 'Custom CSS Class',
        },
        {
            type: 'textInput',
            name: 'customId',
            title: 'Custom Element ID',
        },
    ] as Fields,
};

export const Colors: StoryFn<{blockConfig: Fields}> = ({blockConfig}) => {
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
Colors.args = {
    blockConfig: [
        {type: 'text', text: 'primary — main text', color: 'primary'},
        {type: 'text', text: 'secondary — supporting text', color: 'secondary'},
        {type: 'text', text: 'hint — helper text', color: 'hint'},
        {type: 'text', text: 'info — informational', color: 'info'},
        {type: 'text', text: 'positive — success / positive', color: 'positive'},
        {type: 'text', text: 'warning — warning', color: 'warning'},
        {type: 'text', text: 'danger — error / danger', color: 'danger'},
        {type: 'text', text: 'utility — utility', color: 'utility'},
        {type: 'text', text: 'misc — miscellaneous', color: 'misc'},
    ] as Fields,
};

export const AsHintBetweenFields = Template.bind({});
AsHintBetweenFields.storyName = 'Hint between fields';
AsHintBetweenFields.args = {
    blockConfig: [
        {
            type: 'switch',
            name: 'customColors',
            title: 'Custom colors',
        },
        {
            type: 'text',
            text: 'Choose colors that match your brand palette.',
            color: 'hint',
            when: [{field: 'customColors', operator: '===', value: true}],
        },
        {
            type: 'colorInput',
            name: 'primaryColor',
            title: 'Primary Color',
            when: [{field: 'customColors', operator: '===', value: true}],
        },
        {
            type: 'colorInput',
            name: 'secondaryColor',
            title: 'Secondary Color',
            when: [{field: 'customColors', operator: '===', value: true}],
        },
    ] as Fields,
};
