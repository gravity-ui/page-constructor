import {Meta, StoryFn} from '@storybook/react';

import {DividerProps} from '../../../models';
import Divider from '../Divider';

import data from './data.json';
import './styles.scss';

export default {
    component: Divider,
    title: 'Components/Divider',
} as Meta;

const DefaultTemplate: StoryFn<DividerProps> = (args) => (
    <div>
        <div className="divider-story_indent">
            <Divider {...args} />
        </div>
    </div>
);

const SizesTemplate: StoryFn<Record<number, DividerProps>> = (args) => (
    <div>
        {Object.values(args).map((arg, index) => (
            <div
                key={index}
                style={{display: 'flex', marginBottom: '50px', alignItems: 'flex-start'}}
            >
                <div className="divider-story_indent" style={{width: '90%'}}>
                    <Divider {...arg} />
                </div>
                <div style={{alignSelf: 'center', marginLeft: '10px'}}>{arg.size}</div>
            </div>
        ))}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Sizes = SizesTemplate.bind([]);

Default.args = data.default as DividerProps;
Sizes.args = data.sizes as DividerProps[];
Sizes.parameters = {
    controls: {
        include: Object.keys(data.sizes),
    },
};
