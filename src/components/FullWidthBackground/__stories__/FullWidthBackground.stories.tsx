import {Meta, StoryFn} from '@storybook/react';

import FullWidthBackground, {FullWidthBackgroundProps} from '../FullWidthBackground';

import data from './data.json';

export default {
    title: 'Components/FullWidthBackground',
    component: FullWidthBackground,
    parameters: {
        argTypes: {
            theme: {
                control: {type: 'radio'},
                options: ['default', 'rounded'],
            },
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<FullWidthBackgroundProps> = (args) => {
    return (
        <div
            style={{
                height: '100px',
            }}
            key={args.theme}
        >
            <FullWidthBackground {...args}>
                <div
                    style={{
                        padding: '20px',
                        margin: '20px',
                    }}
                >
                    Children
                </div>
            </FullWidthBackground>
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
export const Rounded = DefaultTemplate.bind({});

Default.args = data.default as FullWidthBackgroundProps;

Rounded.args = data.rounded as FullWidthBackgroundProps;
Rounded.parameters = {
    controls: {
        include: Object.keys(data.rounded),
    },
};
