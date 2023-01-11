import React from 'react';
import {GaInline, Metrika, Pixel} from '../../models';

export interface MetrikaContextProps {
    metrika?: Metrika;
    pixel?: Pixel;
    gaInline?: GaInline;
}

export const MetrikaContext = React.createContext<MetrikaContextProps>({});
