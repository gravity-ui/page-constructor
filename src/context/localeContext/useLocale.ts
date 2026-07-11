import * as React from 'react';

import {LocaleContext, LocaleContextProps} from './localeContext';
import {getServerLocale} from './serverLocale';

const isRscServer = typeof React.createContext !== 'function';

export function useLocale(): LocaleContextProps {
    if (isRscServer) {
        return getServerLocale();
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useContext(LocaleContext);
}
