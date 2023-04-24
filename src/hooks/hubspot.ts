import {useEffect} from 'react';

import {HubspotEventHandlers, handleHubspotEvents, loopBackHabspotEvents} from '../utils/hubspot';

/**
 * @param {string} formId
 * @returns {void}
 *
 * @description Use this hook on top level frame to loopback hubspot forms events back to origin frame
 */
export function useLoopBackHubspotEvents(formId: string): void {
    useEffect(() => {
        const topHandler = loopBackHabspotEvents(formId);

        window.addEventListener('message', topHandler);

        return () => {
            window.removeEventListener('message', topHandler);
        };
    }, [formId]);
}

/**
 * @param {HubspotEventHandlers} handlers form event handlers, should be stable across renders
 * @param {string} formId
 * @returns {void}
 *
 * @description Use this hook in any frame to handle hubspot forms events
 */
export function useHandleHubspotEvents(handlers: HubspotEventHandlers, formId: string): void {
    useEffect(() => {
        const topHandler = handleHubspotEvents(handlers, formId);

        window.addEventListener('message', topHandler);

        return () => {
            window.removeEventListener('message', topHandler);
        };
    }, [handlers, formId]);
}
