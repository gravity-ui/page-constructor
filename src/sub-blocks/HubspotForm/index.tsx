import React, {useContext, useMemo} from 'react';

import {block} from '../../utils';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {MobileContext} from '../../context/mobileContext';
import {useMetrika} from '../../hooks/useMetrika';
import {HubspotFormProps} from '../../models';
import {useHandleHubspotEvents} from '../../hooks';
import HubspotFormContainer from './HubspotFormContainer';
import {HubspotEventHandlers} from '../../utils/hubspot';

import './HubspotForm.scss';

const b = block('hubspot-form');

const HubspotForm: React.FunctionComponent<HubspotFormProps> = (props) => {
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
        onBeforeSubmit,
        onSubmit,
        onBeforeLoad,
        onLoad,
        onSubmitError,
    } = props;

    const handleMetrika = useMetrika();
    const {themeValue} = useContext(ThemeValueContext);
    const isMobileValue = useContext(MobileContext);

    const theme = themeProp ?? themeValue;
    const mobile = isMobileProp ?? isMobileValue;

    const handlers = useMemo<HubspotEventHandlers>(
        () => ({
            onBeforeLoad,
            onBeforeSubmit,
            onLoad,
            onSubmitError,
            onSubmit: (e) => {
                handleMetrika?.({pixelEvents});
                onSubmit?.(e);
            },
        }),
        [onBeforeLoad, onBeforeSubmit, onLoad, handleMetrika, pixelEvents, onSubmit, onSubmitError],
    );

    useHandleHubspotEvents(handlers, formId);

    return (
        <HubspotFormContainer
            key={[formClassName, formId, formInstanceId, portalId, region].join()}
            className={b({theme, mobile}, className)}
            formClassName={formClassName}
            formId={formId}
            portalId={portalId}
            formInstanceId={formInstanceId}
            region={region}
        />
    );
};

export default HubspotForm;
