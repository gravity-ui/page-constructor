import React, {useRef} from 'react';

import {useMount} from '../../hooks';
import {HubspotFormProps} from '../../models';

import loadHubspotScript from './loadHubspotScript';

type HubspotFormContainerPropsKeys =
    | 'className'
    | 'formId'
    | 'formInstanceId'
    | 'portalId'
    | 'region'
    | 'formClassName'
    | 'createDOMElement';

type HubspotFormContainerProps = Pick<HubspotFormProps, HubspotFormContainerPropsKeys>;

const HubspotFormContainer = (props: HubspotFormContainerProps) => {
    const {
        className,

        formId,
        formInstanceId,
        portalId,
        region,
        formClassName,
        createDOMElement,
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const hsContainerRef = useRef<HTMLDivElement>();

    const containerId = formInstanceId
        ? `hubspot-form-${formId}-${formInstanceId}`
        : `hubspot-form-${formId}`;

    const createForm = () => {
        if (containerRef.current && !hsContainerRef.current && createDOMElement) {
            hsContainerRef.current = document.createElement('div');
            containerRef.current.id = '';
            hsContainerRef.current.id = containerId;
            containerRef.current.appendChild(hsContainerRef.current);
        }

        if (!createDOMElement || hsContainerRef.current) {
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
        }
    };

    useMount(() => {
        (async () => {
            if (!window.hbspt) {
                await loadHubspotScript();
            }

            createForm();
        })();

        return () => {
            if (createDOMElement && containerRef.current && containerRef.current.lastChild) {
                containerRef.current.removeChild(containerRef.current.lastChild);
            }
        };
    });

    return <div className={className} id={containerId} ref={containerRef} />;
};

export default HubspotFormContainer;
