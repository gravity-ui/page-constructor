import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'FormGenerator/Default Values',
    component: FormGenerator,
    parameters: {
        layout: 'padded',
        resultPanel: true,
        docs: {
            description: {
                component:
                    'Fields support a `defaultValue` prop. When the field first becomes visible ' +
                    'and its path in `content` is empty, the default value is written automatically. ' +
                    'This works both on mount and when a hidden field appears via a `when` condition.',
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

/**
 * Each supported field type with `defaultValue` set.
 * Open the result panel to see values written into content on mount.
 */
export const FieldDefaultValues = Template.bind({});
FieldDefaultValues.storyName = 'Default values across field types';
FieldDefaultValues.args = {
    blockConfig: [
        {
            type: 'textInput',
            name: 'title',
            title: 'Title',
            defaultValue: 'My page title',
        },
        {
            type: 'textArea',
            name: 'description',
            title: 'Description',
            defaultValue: 'A short description of the page.',
        },
        {
            type: 'select',
            name: 'layout',
            title: 'Layout',
            defaultValue: 'centered',
            options: [
                {value: 'default', content: 'Default'},
                {value: 'centered', content: 'Centered'},
                {value: 'wide', content: 'Wide'},
            ],
        },
        {
            type: 'segmentedRadioGroup',
            name: 'size',
            title: 'Size',
            defaultValue: 'md',
            options: [
                {value: 'sm', content: 'S'},
                {value: 'md', content: 'M'},
                {value: 'lg', content: 'L'},
            ],
        },
        {
            type: 'colorInput',
            name: 'accentColor',
            title: 'Accent Color',
            defaultValue: '#027bf3',
        },
    ] as Fields,
};

/**
 * A conditional field with a `defaultValue`.
 * Enable the switch to reveal the hidden fields — their default values are
 * written into content automatically when they appear.
 * Disable the switch to hide them — values are cleared from content automatically.
 */
export const ConditionalDefaultValue = Template.bind({});
ConditionalDefaultValue.storyName = 'Default value on conditional reveal';
ConditionalDefaultValue.args = {
    blockConfig: [
        {
            type: 'switch',
            name: 'enableBanner',
            title: 'Enable banner',
        },
        {
            type: 'text',
            text: 'Toggle the switch above. The fields below appear with pre-filled defaults.',
            when: [{field: 'enableBanner', operator: '===', value: true}],
        },
        {
            type: 'textInput',
            name: 'bannerTitle',
            title: 'Banner Title',
            defaultValue: 'Special offer',
            when: [{field: 'enableBanner', operator: '===', value: true}],
        },
        {
            type: 'select',
            name: 'bannerTheme',
            title: 'Banner Theme',
            defaultValue: 'info',
            options: [
                {value: 'info', content: 'Info'},
                {value: 'warning', content: 'Warning'},
                {value: 'danger', content: 'Danger'},
            ],
            when: [{field: 'enableBanner', operator: '===', value: true}],
        },
        {
            type: 'colorInput',
            name: 'bannerColor',
            title: 'Banner Color',
            defaultValue: '#f5c518',
            when: [{field: 'enableBanner', operator: '===', value: true}],
        },
    ] as Fields,
};
