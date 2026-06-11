import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'FormGenerator/Pre-Populated',
    component: FormGenerator,
    parameters: {
        layout: 'padded',
        resultPanel: true,
        docs: {
            description: {
                component:
                    'Pass existing data via `contentConfig` to render the form in edit mode. ' +
                    'All fields render with their current values pre-filled. ' +
                    'This is the typical pattern when editing an already-saved block.',
            },
        },
    },
} as Meta<typeof FormGenerator>;

const blockConfig: Fields = [
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
    {
        type: 'select',
        name: 'layout',
        title: 'Layout',
        hasClear: true,
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
        options: [
            {value: 'sm', content: 'S'},
            {value: 'md', content: 'M'},
            {value: 'lg', content: 'L'},
        ],
    },
    {
        type: 'switch',
        name: 'showMedia',
        title: 'Show media',
    },
    {
        type: 'section',
        title: 'Media',
        when: [{field: 'showMedia', operator: '===', value: true}],
        opened: true,
        fields: [
            {
                type: 'textInput',
                name: 'media.src',
                title: 'Image URL',
            },
            {
                type: 'textInput',
                name: 'media.alt',
                title: 'Alt text',
            },
            {
                type: 'colorInput',
                name: 'media.overlayColor',
                title: 'Overlay Color',
            },
        ],
    },
    {
        type: 'section',
        title: 'Button',
        index: 'i',
        withAddButton: true,
        itemTitle: 'Button {{i}}',
        itemView: 'card',
        fields: [
            {
                type: 'textInput',
                name: 'buttons[{{i}}].text',
                title: 'Label',
            },
            {
                type: 'textInput',
                name: 'buttons[{{i}}].url',
                title: 'URL',
            },
            {
                type: 'select',
                name: 'buttons[{{i}}].theme',
                title: 'Theme',
                options: [
                    {value: 'action', content: 'Action'},
                    {value: 'outlined', content: 'Outlined'},
                    {value: 'normal', content: 'Normal'},
                ],
            },
        ],
    },
];

const Template: StoryFn<{initialContent: Content}> = ({initialContent}) => {
    const [content, setContent] = useResultPanel<Content>(initialContent);
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
 * All fields pre-filled — simulates opening an already-saved block for editing.
 */
export const EditMode = Template.bind({});
EditMode.storyName = 'Edit mode (fully pre-filled)';
EditMode.args = {
    initialContent: {
        title: 'Getting started with page-constructor',
        description: 'A comprehensive guide to building pages with the block editor.',
        layout: 'centered',
        size: 'lg',
        showMedia: true,
        media: {
            src: 'https://example.com/hero.jpg',
            alt: 'Hero image',
            overlayColor: '#00000066',
        },
        buttons: [
            {text: 'Read docs', url: '/docs', theme: 'action'},
            {text: 'GitHub', url: 'https://github.com', theme: 'outlined'},
        ],
    },
};

/**
 * Only some fields pre-filled — the rest remain empty.
 * Common when a block was saved with minimal data and the user needs to fill in the rest.
 */
export const PartialData = Template.bind({});
PartialData.storyName = 'Partial data (edit incomplete block)';
PartialData.args = {
    initialContent: {
        title: 'Untitled block',
        layout: 'default',
        showMedia: false,
    },
};
