export type HubspotEventName =
    | 'onBeforeFormInit'
    | 'onFormReady'
    | 'onFormSubmit'
    | 'onFormSubmitted'
    | 'onFormError'
    | `_${string}`;

export interface HubspotEventData {
    type: HubspotEventName | string;
    eventName: HubspotEventName;
    id: string;
    data?: unknown;
}

export type HubspotFormDefaultValues = Record<string, string | number | boolean>;

export function isHubspotEventData(maybeData: unknown): maybeData is HubspotEventData {
    return (
        typeof maybeData === 'object' &&
        maybeData !== null &&
        'type' in maybeData &&
        (maybeData as Record<string, unknown>)['type'] === 'hsFormCallback'
    );
}

export interface HubspotEventHandlers {
    onBeforeLoad?: (arg: HubspotEventData) => void;
    onBeforeSubmit?: (arg: HubspotEventData) => void;
    onSubmit?: (arg: HubspotEventData) => void;
    onLoad?: (arg: HubspotEventData) => void;
    onSubmitError?: (arg: HubspotEventData) => void;
}

export function loopBackHabspotEvents(formId: string) {
    return ({data, source, origin}: MessageEvent): void => {
        if (!isHubspotEventData(data)) {
            return;
        }

        if (data.id !== formId) {
            return;
        }

        if (source === window) {
            return;
        }

        (source as Window | null)?.postMessage(data, origin);
    };
}

export function handleHubspotEvents(handlers: HubspotEventHandlers, formId: string) {
    return ({data}: MessageEvent): void => {
        if (!isHubspotEventData(data)) {
            return;
        }

        if (data.id !== formId) {
            return;
        }

        switch (data.eventName) {
            case 'onBeforeFormInit': {
                handlers.onBeforeLoad?.(data);
                break;
            }
            case 'onFormReady': {
                handlers.onLoad?.(data);
                break;
            }
            case 'onFormSubmit': {
                handlers.onBeforeSubmit?.(data);
                break;
            }
            case 'onFormSubmitted': {
                handlers.onSubmit?.(data);
                break;
            }
            case 'onFormError': {
                handlers.onSubmitError?.(data);
                break;
            }
            default:
                break;
        }
    };
}
