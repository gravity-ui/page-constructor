import React, {forwardRef, useContext, useMemo} from 'react';

import {MobileContext} from '../../context/mobileContext';
import {useTheme} from '../../context/theme';
import {useAnalytics, useHandleHubspotEvents} from '../../hooks';
import {useMetrika} from '../../hooks/useMetrika';
import {DefaultEventNames, HubspotFormProps} from '../../models';
import {HubspotEventHandlers, block} from '../../utils';

import HubspotFormContainer from './HubspotFormContainer';

import './HubspotForm.scss';

const b = block('hubspot-form');

const HubspotForm = forwardRef<HTMLDivElement, HubspotFormProps>((props, ref) => {
    const {
        className,
        theme: themeProp,
        isMobile: isMobileProp,
        formId,
        formInstanceId,
        portalId,
        region,
        formClassName,
        pixelEvents,
        // hubspotEvents, // TODO: decide how to handle them
        analyticsEvents,
        onBeforeSubmit,
        onSubmit,
        onBeforeLoad,
        onLoad,
        createDOMElement,
        onSubmitError,
    } = props;

    const handleMetrika = useMetrika();
    const [themeValue] = useTheme();
    const handleAnalytics = useAnalytics(DefaultEventNames.HubspotFormSubmit);
    const isMobileValue = useContext(MobileContext);

    const theme = themeProp ?? themeValue;
    const mobile = isMobileProp ?? isMobileValue;

    const handlers = useMemo<HubspotEventHandlers>(
        () => ({
            onBeforeLoad,
            onBeforeSubmit,
            onLoad,
            onSubmitError,
            onSubmit: (event) => {
                handleMetrika?.({pixelEvents});
                handleAnalytics(analyticsEvents);
                onSubmit?.(event);
            },
        }),
        [
            onBeforeLoad,
            onBeforeSubmit,
            onLoad,
            handleMetrika,
            pixelEvents,
            handleAnalytics,
            analyticsEvents,
            onSubmit,
            onSubmitError,
        ],
    );

    useHandleHubspotEvents(handlers, formId);
    return (
        <HubspotFormContainer
            createDOMElement={createDOMElement}
            key={[formClassName, formId, formInstanceId, portalId, region].join()}
            className={b({theme, mobile}, className)}
            formClassName={formClassName}
            formId={formId}
            portalId={portalId}
            formInstanceId={formInstanceId}
            region={region}
            ref={ref}
        />
    );
});

HubspotForm.displayName = 'HubspotForm';

export default HubspotForm;
