import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import HubspotForm from '..';
import {COMPONENTS} from '../../../demo/constants';
import {HubspotFormProps} from '../../../models/';

export default {
    component: HubspotForm,
    title: `${COMPONENTS}/HubspotForm`,
} as Meta;

const DefaultTemplate: Story<HubspotFormProps> = (args) => (
    <div style={{maxWidth: '800px'}}>
        <HubspotForm {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    region: 'eu1',
    portalId: '25764979',
    formId: '2265b08a-47d2-4f80-8158-06fc1900d837',
    className: 'example-class-name',
    onBeforeLoad: () => console.log('onBeforeLoad'),
    onBeforeSubmit: () => console.log('onBeforeSubmit'),
    onLoad: () => console.log('onLoad'),
    onSubmit: () => console.log('onSubmit'),
};
