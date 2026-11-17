import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import type {Content, Fields} from '../types';

export default {
    title: 'FormGenerator/MarkdownEditor',
    component: FormGenerator,
    parameters: {layout: 'padded', resultPanel: true},
} as Meta<typeof FormGenerator>;

const Template: StoryFn<{blockConfig: Fields}> = ({blockConfig}) => {
    const [content, setContent] = useResultPanel<Content>({});
    return (
        <div style={{maxWidth: 720}}>
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
            type: 'markdownEditor',
            name: 'description',
            title: 'Description',
            defaultValue: '## Mission\n\nDescribe the **mission**.',
            placeholder: 'Write Markdown',
        },
    ],
};

export const RepeatingSection = Template.bind({});
RepeatingSection.args = {
    blockConfig: [
        {
            type: 'section',
            title: 'Chapters',
            index: 'index',
            withAddButton: true,
            itemTitle: 'Chapter {{index}}',
            itemView: 'card',
            fields: [
                {
                    type: 'markdownEditor',
                    name: 'chapters[{{index}}].text',
                    title: 'Text',
                    defaultValue: '**New chapter**',
                },
            ],
        },
    ],
};
