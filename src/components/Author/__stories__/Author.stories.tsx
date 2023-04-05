import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS} from '../../../demo/constants';
import {AuthorProps, AuthorType} from '../../../models';
import Author from '../Author';

import data from './data.json';

export default {
    component: Author,
    title: `${COMPONENTS}/Author`,
} as Meta;

const DefaultTemplate: Story<AuthorProps> = (args) => <Author {...args} />;

const TypesTemplate: Story<AuthorProps> = (args) => (
    <div>
        <div style={{paddingBottom: '32px'}}>
            <h3>Type Column</h3>
            <Author {...args} />
        </div>
        <div>
            <h3>Type Line</h3>
            <Author {...args} type={AuthorType.Line} />
        </div>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Types = TypesTemplate.bind({});

Default.args = data.default.content as AuthorProps;
Types.args = data.default.content as AuthorProps;
