import React from 'react';
import {GaInline, Metrika, Pixel} from '../../models';

export interface MetrikaContextProps {
    metrika?: Metrika;
    pixel?: Pixel;
    ga?: GaInline;
}

export const MetrikaContext = React.createContext<MetrikaContextProps>({});
