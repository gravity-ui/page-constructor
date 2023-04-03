import React from 'react';

import {Metrika, Pixel} from '../../models';

export interface MetrikaContextProps {
    /**
     * @deprecated Metrika will be deleted
     */
    metrika?: Metrika;
    /**
     * @deprecated Metrika will be deleted
     */
    pixel?: Pixel;
}

export const MetrikaContext = React.createContext<MetrikaContextProps>({});
