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
    formId: 'a3eb06a6-e8ce-45d4-81bd-7fadb7dab313',
    className: 'example-class-name',
    onBeforeLoad: () => console.log('onBeforeLoad'),
    onBeforeSubmit: () => console.log('onBeforeSubmit'),
    onLoad: () => console.log('onLoad'),
    onSubmit: () => console.log('onSubmit'),
};
