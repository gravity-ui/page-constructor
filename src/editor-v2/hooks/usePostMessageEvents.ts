import * as React from 'react';

import {requestActionPostMessage} from '../../common/postMessage';
import {ActionMessageTypes} from '../../common/types';
import {IframeContext} from '../context/iframeContext';

interface UsePostMessageRequestReturn {
    requestPostMessage: <K extends keyof ActionMessageTypes>(
        action: K,
        data: ActionMessageTypes[K],
    ) => void;
}

export function usePostMessageEvents(): UsePostMessageRequestReturn {
    const {iframeElement} = React.useContext(IframeContext);

    return {
        requestPostMessage: (action, data) => {
            if (iframeElement && iframeElement.contentWindow) {
                return requestActionPostMessage(action, data, iframeElement.contentWindow);
            }

            return undefined;
        },
    };
}
