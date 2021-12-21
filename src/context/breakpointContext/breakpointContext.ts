import React from 'react';

import {BREAKPOINTS} from '../../constants';

export const BreakpointContext = React.createContext<number>(BREAKPOINTS.sm);
