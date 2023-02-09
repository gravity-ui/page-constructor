import React, {useEffect, useRef, useState} from 'react';

import loadHubspotScript from './loadHubspotScript';
import {HubspotFormProps} from '../../models';
import {useMount} from '../../hooks';

type HubspotFormContainerPropsKeys =
    | 'className'
    | 'formId'
    | 'formInstanceId'
    | 'portalId'
    | 'region'
    | 'formClassName'
    | 'inVirtualDom';

type HubspotFormContainerProps = Pick<HubspotFormProps, HubspotFormContainerPropsKeys>;

const HubspotFormContainer = (props: HubspotFormContainerProps) => {
    const {
        className,

        formId,
        formInstanceId,
        portalId,
        region,
        formClassName,
        inVirtualDom,
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const hsContainerRef = useRef<HTMLDivElement>();
    const [scriptIsLoaded, setScriptIsLoaded] = useState(false);

    const containerId = formInstanceId
        ? `hubspot-form-${formId}-${formInstanceId}`
        : `hubspot-form-${formId}`;

    useMount(() => {
        (async () => {
            if (!window.hbspt) {
                await loadHubspotScript();
            }
            setScriptIsLoaded(true);
        })();

        return () => {
            if (!inVirtualDom && containerRef.current && containerRef.current.lastChild) {
                containerRef.current.removeChild(containerRef.current.lastChild);
            }
        };
    });

    useEffect(() => {
        if (containerRef.current && !hsContainerRef.current && !inVirtualDom) {
            hsContainerRef.current = document.createElement('div');
            containerRef.current.id = '';
            hsContainerRef.current.id = containerId;
            containerRef.current.appendChild(hsContainerRef.current);
        }

        if (inVirtualDom || hsContainerRef.current) {
            if (scriptIsLoaded && window.hbspt) {
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
    }, [
        containerId,
        formClassName,
        formId,
        formInstanceId,
        inVirtualDom,
        portalId,
        region,
        scriptIsLoaded,
    ]);

    return <div className={className} id={containerId} ref={containerRef} />;
};

export default HubspotFormContainer;
