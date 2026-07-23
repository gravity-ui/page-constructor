import * as React from 'react';

import {MobileContext} from './MobileContext';
import {getServerMobile} from './serverMobile';

const isRscServer = typeof React.createContext !== 'function';

export function useMobile(): boolean {
    if (isRscServer) {
        return getServerMobile();
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useContext(MobileContext);
}
