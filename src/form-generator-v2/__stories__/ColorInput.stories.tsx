import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'FormGenerator/ColorInput',
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

export const Default = Template.bind({});
Default.args = {
    blockConfig: [
        {
            type: 'colorInput',
            name: 'color',
            title: 'Color',
        },
    ] as Fields,
};
