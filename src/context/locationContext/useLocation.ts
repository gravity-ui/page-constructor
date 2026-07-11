import * as React from 'react';

import {LocationContext, LocationContextProps} from './locationContext';
import {getServerLocation} from './serverLocation';

const isRscServer = typeof React.createContext !== 'function';

export function useLocation(): LocationContextProps {
    if (isRscServer) {
        return getServerLocation();
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useContext(LocationContext);
}
