import * as React from 'react';

import {MicrodataContext, MicrodataContextProps} from './MicrodataContext';

export function useMicrodata(): MicrodataContextProps {
    return React.useContext(MicrodataContext);
}
