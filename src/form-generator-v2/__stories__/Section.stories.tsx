import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'FormGenerator/Section',
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
            <FormGenerator
                blockConfig={blockConfig}
                contentConfig={content}
                onUpdate={setContent}
            />
        </div>
    );
};

export const Collapsible = Template.bind({});
Collapsible.storyName = 'Collapsible (collapsed by default)';
Collapsible.args = {
    blockConfig: [
        {
            type: 'textInput',
            name: 'title',
            title: 'Title',
        },
        {
            type: 'section',
            title: 'Advanced Settings',
            fields: [
                {
                    type: 'textInput',
                    name: 'slug',
                    title: 'Slug',
                },
                {
                    type: 'select',
                    name: 'theme',
                    title: 'Theme',
                    options: [
                        {value: 'light', content: 'Light'},
                        {value: 'dark', content: 'Dark'},
                    ],
                },
            ],
        },
    ] as Fields,
};

export const OpenedByDefault = Template.bind({});
OpenedByDefault.storyName = 'Opened by Default';
OpenedByDefault.args = {
    blockConfig: [
        {
            type: 'section',
            title: 'Settings (opened by default)',
            opened: true,
            fields: [
                {
                    type: 'textInput',
                    name: 'name',
                    title: 'Name',
                },
                {
                    type: 'textArea',
                    name: 'bio',
                    title: 'Bio',
                },
            ],
        },
    ] as Fields,
};

export const WithInfoNote = Template.bind({});
WithInfoNote.storyName = 'With Info Note';
WithInfoNote.args = {
    blockConfig: [
        {
            type: 'section',
            title: 'Analytics',
            fields: [
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
            ],
        },
    ] as Fields,
};

export const WithDangerNote = Template.bind({});
WithDangerNote.storyName = 'With Danger Note';
WithDangerNote.args = {
    blockConfig: [
        {
            type: 'section',
            title: 'Danger Zone',
            fields: [
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
            ],
        },
    ] as Fields,
};

export const ArraySection = Template.bind({});
ArraySection.storyName = 'Array Section (repeating items)';
ArraySection.args = {
    blockConfig: [
        {
            type: 'section',
            title: 'Button',
            index: 'index',
            withAddButton: true,
            itemTitle: 'Button {{index}}',
            fields: [
                {
                    type: 'textInput',
                    name: 'buttons[{{index}}].text',
                    title: 'Button Text',
                },
                {
                    type: 'textInput',
                    name: 'buttons[{{index}}].url',
                    title: 'URL',
                },
                {
                    type: 'select',
                    name: 'buttons[{{index}}].theme',
                    title: 'Theme',
                    options: [
                        {value: 'action', content: 'Action'},
                        {value: 'outlined', content: 'Outlined'},
                        {value: 'normal', content: 'Normal'},
                    ],
                },
            ],
        },
    ] as Fields,
};

export const ArraySectionCard = Template.bind({});
ArraySectionCard.storyName = 'Array Section – card view';
ArraySectionCard.args = {
    blockConfig: [
        {
            type: 'section',
            title: 'Buttons',
            index: 'index',
            withAddButton: true,
            itemTitle: 'Button {{index}}',
            itemView: 'card',
            fields: [
                {
                    type: 'textInput',
                    name: 'buttons[{{index}}].text',
                    title: 'Button Text',
                },
                {
                    type: 'textInput',
                    name: 'buttons[{{index}}].url',
                    title: 'URL',
                },
                {
                    type: 'select',
                    name: 'buttons[{{index}}].theme',
                    title: 'Theme',
                    options: [
                        {value: 'action', content: 'Action'},
                        {value: 'outlined', content: 'Outlined'},
                        {value: 'normal', content: 'Normal'},
                    ],
                },
            ],
        },
    ] as Fields,
};

export const ArraySectionClear = Template.bind({});
ArraySectionClear.storyName = 'Array Section – clear view';
ArraySectionClear.args = {
    blockConfig: [
        {
            type: 'section',
            title: 'Links',
            index: 'index',
            withAddButton: true,
            itemTitle: 'Link {{index}}',
            itemView: 'clear',
            fields: [
                {
                    type: 'textInput',
                    name: 'links[{{index}}].text',
                    title: 'Text',
                },
                {
                    type: 'textInput',
                    name: 'links[{{index}}].url',
                    title: 'URL',
                },
            ],
        },
    ] as Fields,
};

export const NestedArraySection = Template.bind({});
NestedArraySection.storyName = 'Nested Array Section';
NestedArraySection.args = {
    blockConfig: [
        {
            type: 'section',
            title: 'Navigation',
            opened: true,
            fields: [
                {
                    type: 'textInput',
                    name: 'navigation.label',
                    title: 'Navigation Label',
                },
                {
                    type: 'section',
                    title: 'Item',
                    index: 'index',
                    withAddButton: true,
                    itemTitle: 'Item {{index}}',
                    fields: [
                        {
                            type: 'textInput',
                            name: 'navigation.items[{{index}}].text',
                            title: 'Text',
                        },
                        {
                            type: 'textInput',
                            name: 'navigation.items[{{index}}].url',
                            title: 'URL',
                        },
                    ],
                },
            ],
        },
    ] as Fields,
};

export const NestedSections = Template.bind({});
NestedSections.storyName = 'Nested Sections';
NestedSections.args = {
    blockConfig: [
        {
            type: 'textInput',
            name: 'pageTitle',
            title: 'Page Title',
        },
        {
            type: 'section',
            title: 'Header',
            fields: [
                {
                    type: 'textInput',
                    name: 'header.title',
                    title: 'Header Title',
                },
                {
                    type: 'section',
                    title: 'Header Media',
                    fields: [
                        {
                            type: 'textInput',
                            name: 'header.media.src',
                            title: 'Image URL',
                        },
                        {
                            type: 'textInput',
                            name: 'header.media.alt',
                            title: 'Alt Text',
                        },
                    ],
                },
            ],
        },
        {
            type: 'section',
            title: 'Footer',
            fields: [
                {
                    type: 'textInput',
                    name: 'footer.text',
                    title: 'Footer Text',
                },
                {
                    type: 'textInput',
                    name: 'footer.url',
                    title: 'Footer URL',
                },
            ],
        },
    ] as Fields,
};
