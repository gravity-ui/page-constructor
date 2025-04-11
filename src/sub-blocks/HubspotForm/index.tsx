import * as React from 'react';

import {MobileContext} from '../../context/mobileContext';
import {useTheme} from '../../context/theme';
import {useAnalytics, useHandleHubspotEvents} from '../../hooks';
import {DefaultEventNames, HubspotFormProps} from '../../models';
import {HubspotEventHandlers, block} from '../../utils';

import HubspotFormContainer from './HubspotFormContainer';

import './HubspotForm.scss';

const b = block('hubspot-form');

const HubspotForm = React.forwardRef<HTMLDivElement, HubspotFormProps>((props, ref) => {
    const {
        className,
        theme: themeProp,
        isMobile: isMobileProp,
        formId,
        formInstanceId,
        portalId,
        region,
        formClassName,
        // hubspotEvents, // TODO: decide how to handle them
        analyticsEvents,
        onBeforeSubmit,
        onSubmit,
        onBeforeLoad,
        onLoad,
        createDOMElement,
        onSubmitError,
        defaultValues,
    } = props;

    const themeValue = useTheme();
    const handleAnalytics = useAnalytics(DefaultEventNames.HubspotFormSubmit);
    const isMobileValue = React.useContext(MobileContext);

    const theme = themeProp ?? themeValue;
    const mobile = isMobileProp ?? isMobileValue;

    const handlers = React.useMemo<HubspotEventHandlers>(
        () => ({
            onBeforeLoad,
            onBeforeSubmit,
            onLoad,
            onSubmitError,
            onSubmit: (event) => {
                handleAnalytics(analyticsEvents);
                onSubmit?.(event);
            },
        }),
        [
            onBeforeLoad,
            onBeforeSubmit,
            onLoad,
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
            defaultValues={defaultValues}
            ref={ref}
        />
    );
});

HubspotForm.displayName = 'HubspotForm';

export default HubspotForm;
