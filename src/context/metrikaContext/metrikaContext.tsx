import React from 'react';
import {Metrika, Pixel} from '../../models';

export interface MetrikaContextProps {
    metrika?: Metrika;
    pixel?: Pixel;
}

export const MetrikaContext = React.createContext<MetrikaContextProps>({});
