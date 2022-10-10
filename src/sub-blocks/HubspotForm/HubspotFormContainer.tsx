import React from 'react';

import loadHubspotScript from './loadHubspotScript';
import {HubspotFormProps} from '../../models';
import {useMount} from '../../hooks';

type HubspotFormContainerPropsKeys =
    | 'className'
    | 'formId'
    | 'formInstanceId'
    | 'portalId'
    | 'region'
    | 'formClassName';

type HubspotFormContainerProps = Pick<HubspotFormProps, HubspotFormContainerPropsKeys>;

const HubspotFormContainer = (props: HubspotFormContainerProps) => {
    const {
        className,

        formId,
        formInstanceId,
        portalId,
        region,
        formClassName,
    } = props;

    const containerId = formInstanceId
        ? `hubspot-form-${formId}-${formInstanceId}`
        : `hubspot-form-${formId}`;

    useMount(() => {
        (async () => {
            if (!window.hbspt) {
                await loadHubspotScript();
            }

            if (window.hbspt) {
                window.hbspt.forms.create({
                    region,
                    portalId,
                    formId,
                    target: `#${containerId}`,
                    cssClass: formClassName,
                    formInstanceId,
                });
            }
        })();
    });

    return <div className={className} id={containerId} />;
};

export default HubspotFormContainer;
