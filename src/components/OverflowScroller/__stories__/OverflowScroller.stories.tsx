import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import OverflowScroller, {OverflowScrollerProps} from '../OverflowScroller';

export default {
    component: OverflowScroller,
    title: 'Components/OverflowScroller',
} as Meta;

const DefaultTemplate: StoryFn<OverflowScrollerProps> = (args) => (
    <div style={{maxWidth: '300px'}}>
        <OverflowScroller {...args}>
            <div style={{display: 'flex'}}>
                <div style={{padding: '10px'}}>children&#160;1</div>
                <div style={{padding: '10px'}}>children&#160;2</div>
                <div style={{padding: '10px'}}>children&#160;3</div>
                <div style={{padding: '10px'}}>children&#160;4</div>
                <div style={{padding: '10px'}}>children&#160;5</div>
                <div style={{padding: '10px'}}>children&#160;6</div>
                <div style={{padding: '10px'}}>children&#160;7</div>
                <div style={{padding: '10px'}}>children&#160;8</div>
            </div>
        </OverflowScroller>
    </div>
);

export const Default = DefaultTemplate.bind({});
