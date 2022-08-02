import React, {useContext, useEffect} from 'react';

import {block} from '../../utils';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import loadHubspotScript from './loadHubspotScript';
import {useMetrika} from '../../hooks/useMetrika';
import {HubspotFormProps} from '../../models';

import './HubspotForm.scss';

const b = block('hubspot-form');

const HubspotForm: React.FunctionComponent<HubspotFormProps> = (props) => {
    const {
        className,
        formId,
        formInstanceId = '',
        portalId,
        region,
        formClassName,
        pixelEvents,
        onBeforeSubmit,
        onSubmit,
        onBeforeLoad,
        onLoad,
    } = props;
    const containerId = `hubspot-form-${formId}-${formInstanceId}`;
    const handleMetrika = useMetrika();
    const {themeValue: theme} = useContext(ThemeValueContext);

    useEffect(() => {
        const addForm = async () => {
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

                window.addEventListener('message', (event) => {
                    if (event.data.type === 'hsFormCallback' && event.data.id === formId) {
                        switch (event.data.eventName) {
                            case 'onBeforeFormInit': {
                                onBeforeLoad?.();
                                break;
                            }
                            case 'onFormReady': {
                                onLoad?.();
                                break;
                            }
                            case 'onFormSubmit': {
                                onBeforeSubmit?.();
                                break;
                            }
                            case 'onFormSubmitted': {
                                handleMetrika({pixelEvents});
                                onSubmit?.();
                                break;
                            }
                            default:
                                break;
                        }
                    }
                });
            }
        };

        addForm();
    }, [
        containerId,
        formClassName,
        formId,
        formInstanceId,
        handleMetrika,
        onBeforeLoad,
        onBeforeSubmit,
        onLoad,
        onSubmit,
        pixelEvents,
        portalId,
        region,
    ]);

    return <div className={b({theme}, className)} id={containerId} />;
};

export default HubspotForm;
