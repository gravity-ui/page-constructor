import {Meta, StoryFn} from '@storybook/react';

import ReactPlayer, {ReactPlayerBlockProps} from '../ReactPlayer';

import data from './data.json';

export default {
    component: ReactPlayer,
    title: 'Components/Pics, video, DataLens/ReactPlayer',
} as Meta;

const DefaultTemplate: StoryFn<ReactPlayerBlockProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <ReactPlayer {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as ReactPlayerBlockProps;
