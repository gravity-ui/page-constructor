import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'FormGenerator/SegmentedRadioGroup',
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

const sizeOptions = [
    {value: 's', content: 'S'},
    {value: 'm', content: 'M'},
    {value: 'l', content: 'L'},
    {value: 'xl', content: 'XL'},
];

export const Default = Template.bind({});
Default.args = {
    blockConfig: [
        {
            type: 'segmentedRadioGroup',
            name: 'size',
            title: 'Size',
            options: sizeOptions,
        },
    ] as Fields,
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.storyName = 'With Default Value';
WithDefaultValue.args = {
    blockConfig: [
        {
            type: 'segmentedRadioGroup',
            name: 'size',
            title: 'Size (default: M)',
            defaultValue: 'm',
            options: sizeOptions,
        },
    ] as Fields,
};
