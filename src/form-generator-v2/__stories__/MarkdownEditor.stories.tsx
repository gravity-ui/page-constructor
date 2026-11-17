import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content} from '../types';

export default {
    title: 'FormGenerator/MarkdownEditor',
    component: FormGenerator,
    parameters: {
        layout: 'padded',
        resultPanel: true,
    },
} as Meta<typeof FormGenerator>;

export const Default: StoryFn = () => {
    const [content, setContent] = useResultPanel<Content>({});

    return (
        <div style={{maxWidth: 800}}>
            <FormGenerator
                blockConfig={[
                    {
                        type: 'markdownEditor',
                        name: 'description',
                        title: 'Description',
                        defaultValue: 'Some **formatted** text.',
                    },
                    {
                        type: 'markdownEditor',
                        name: 'notes',
                        title: 'Notes',
                        placeholder: 'Add notes',
                    },
                ]}
                contentConfig={content}
                onUpdate={setContent}
            />
        </div>
    );
};
