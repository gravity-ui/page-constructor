import * as React from 'react';

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

const HubspotFormContainer = React.forwardRef<HTMLDivElement, HubspotFormContainerProps>(
    (props, ref) => {
        const {
            className,

            formId,
            formInstanceId,
            portalId,
            region,
            formClassName,
            createDOMElement,
        } = props;

        const containerRef = React.useRef<HTMLDivElement>(null);
        const hsContainerRef = React.useRef<HTMLDivElement>();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        React.useImperativeHandle(ref, () => containerRef.current!);

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
    },
);

HubspotFormContainer.displayName = 'HubspotFormContainer';

export default HubspotFormContainer;
