import {Meta, StoryFn} from '@storybook/react';

import HubspotForm from '..';
import {HubspotFormProps} from '../../../models/';

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

Default.args = {
    region: 'eu1',
    portalId: '25764979',
    formId: 'a3eb06a6-e8ce-45d4-81bd-7fadb7dab313',
    className: 'example-class-name',
    /*eslint-disable  no-console */
    onBeforeLoad: () => console.log('onBeforeLoad'),
    onBeforeSubmit: () => console.log('onBeforeSubmit'),
    onSubmitError: () => console.log('onSubmitError'),
    onLoad: () => console.log('onLoad'),
    onSubmit: () => console.log('onSubmit'),
    /*eslint-enable */
};
