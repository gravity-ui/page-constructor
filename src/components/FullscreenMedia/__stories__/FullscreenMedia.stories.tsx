import {Meta, StoryFn} from '@storybook/react';

import Media from '../../Media/Media';
import FullscreenMedia, {FullscreenMediaProps} from '../FullscreenMedia';

import data from './data.json';

export default {
    component: FullscreenMedia,
    title: 'Components/Pics, video, DataLens/FullscreenMedia',
} as Meta;

const DefaultTemplate: StoryFn<FullscreenMediaProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <FullscreenMedia {...args}>
            {(fullscreenMediaProps = {}) => (
                <Media {...data.default.content} {...fullscreenMediaProps} />
            )}
        </FullscreenMedia>
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {};
