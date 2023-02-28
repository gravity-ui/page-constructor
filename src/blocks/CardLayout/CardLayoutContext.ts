import React, {useContext} from 'react';

import {GridColumnSizesType} from '../../grid/types';

export const DEFAULT_SIZES: GridColumnSizesType = {
    all: 12,
    sm: 6,
    md: 4,
};

type CardLayoutData = {
    colSizes: GridColumnSizesType;
};

const CardLayoutContext = React.createContext<CardLayoutData>({colSizes: DEFAULT_SIZES});

export const useCardLayoutContext = () => useContext(CardLayoutContext);

export default CardLayoutContext;
