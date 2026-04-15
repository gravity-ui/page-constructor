import {Meta, StoryFn} from '@storybook/react';

import HubspotForm from '..';
import {HubspotFormProps} from '../../../models/';

import data from './data.json';

export default {
    component: HubspotForm,
    title: 'Components/HubspotForm',
} as Meta;

const DefaultTemplate: StoryFn<HubspotFormProps> = (args) => (
    <div style={{maxWidth: '800px'}}>
        <HubspotForm {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default as HubspotFormProps;
